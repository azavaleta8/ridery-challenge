import mongoose from 'mongoose';
import { UserModel, IUser } from '../models/User';

/**
 * Sanitizes the user response by removing sensitive information.
 * 
 * @param {IUser} user - The user document.
 * @returns {object} The sanitized user object.
 */
function sanitizeResponse(user: IUser) {
    const { _id, email } = user;
    return { id: _id, email };
}

/**
 * Service for handling user-related operations.
 */
export const UserService = {

    /**
     * Creates a new user.
     * 
     * @param {Partial<IUser>} userPayload - The payload containing user details.
     * @returns {Promise<object>} The newly created user.
     * @throws {Error} If there is an error creating the user.
     */
    async createUser(userPayload: Partial<IUser>) {
        try {
            const newUser: IUser = await UserModel.create(userPayload);
            return sanitizeResponse(newUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error)
                throw new Error(`Error creating user: ${error.message}`);
            }
            throw error;
        }
    },

    /**
     * Retrieves a user by their ID.
     * 
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<object>} The user corresponding to the provided ID.
     * @throws {Error} If the user is not found.
     */
    async getUserById(id: string) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return sanitizeResponse(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching user by ID: ${error.message}`);
            }
            throw error;
        }
    },

    /**
     * Retrieves all users.
     * 
     * @returns {Promise<object[]>} An array of all users.
     * @throws {Error} If there is an error fetching the users.
     */
    async getAllUsers() {
        try {
            const users = await UserModel.find();
            return users.map(user => sanitizeResponse(user));
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching all users: ${error.message}`);
            }
            throw error;
        }
    },

    /**
     * Deletes a user by their ID.
     * 
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
     * @throws {Error} If the user is not found.
     */
    async deleteUser(id: string) {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            if (!user) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
            throw error;
        }
    },
};