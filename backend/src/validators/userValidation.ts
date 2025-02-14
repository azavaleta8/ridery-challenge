import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

/**
 * Middleware to validate the user ID parameter.
 */
export const validateUserId = [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

/**
 * Middleware to validate the user POST request body.
 */
export const validateUserPOST = [
    body('username').isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];