import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Handles user login.
 *
 * This function verifies the user's credentials and generates a JWT if the credentials are valid.
 *
 * @param req - The request object containing the user credentials in the body.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user: IUser | null = await UserModel.findOne({ email });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        next(error);
    }
};