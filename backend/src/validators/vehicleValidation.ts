import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';


/**
 * Middleware to validate the user ID parameter.
 */
export const validateId = [
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
 * Middleware to validate the vehicle POST and PUT request body.
 */
export const validateVehicle = [
    body('brand').isString().withMessage('Brand must be a string').trim().notEmpty().withMessage('Brand is required'),
    body('model').isString().withMessage('Model must be a string').trim().notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1886, max: new Date().getFullYear() + 1 }).withMessage(`Year must be between 1886 and ${new Date().getFullYear() + 1}`),
    body('status').isIn(['available', 'in_maintenance', 'in_service']).withMessage('Status must be one of: available, in_maintenance, in_service'),
    body('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];