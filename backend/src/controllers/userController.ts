import e, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/userService';

/**
 * Creates a new user.
 *
 * This function handles the creation of a new user by calling the UserService's createUser method
 * with the request body. If the user is successfully created, it responds with a status code of 201 (Created)
 * and the created user in JSON format. If an error occurs during the creation process, it passes the error
 * to the next middleware function.
 *
 * @param req - The request object containing the user data in the body.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const createUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Controller to handle the request for getting a user by their ID.
 * 
 * @param req - Express request object containing the user ID in the parameters.
 * @param res - Express response object used to send the response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A promise that resolves to void.
 * 
 * @throws Will throw an error if the user is not found or if there is an unexpected error.
 */
export const getUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await UserService.getUserById(req.params.id);
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

/**
 * Controller to handle the request for getting all users.
 * 
 * @param req - Express request object.
 * @param res - Express response object used to send the response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A promise that resolves to void.
 * 
 * @throws Will throw an error if there is an unexpected error.
 */
export const getAllUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to handle the deletion of a user.
 *
 * @param req - The request object, containing the user ID in the parameters.
 * @param res - The response object, used to send the status and JSON response.
 * @param next - The next middleware function in the stack.
 * @returns A promise that resolves to void.
 *
 * @throws Will throw an error if the user is not found or if there is a server error.
 */
export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await UserService.deleteUser(req.params.id);
        res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        } else {
            next(error);
        }
    }
};