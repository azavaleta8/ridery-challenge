import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as VehicleService from '../services/vehicleService';
import { get } from 'mongoose';


const getUserIdFromRequest = (req: Request, res: Response): string => {
    if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
        throw new Error('User not authenticated');
    }

    return req.user.id;
}

/**
 * Creates a new vehicle.
 *
 * @param req - The request object containing the vehicle data in the body.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const createVehicleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || req.user.id !== req.body["user_id"]) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authorized' });
            return;
        }

        const vehicle = await VehicleService.createVehicle(req.body);
        res.status(StatusCodes.CREATED).json(vehicle);
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing vehicle.
 *
 * @param req - The request object containing the vehicle data in the body.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const updateVehicleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const userId = getUserIdFromRequest(req, res);
        const vehicle = await VehicleService.getVehicleById(req.params.id, userId);
        if (!vehicle) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' });
            return;
        }

        const vehicleUpdated = await VehicleService.updateVehicle(req.params.id, req.body);
        res.status(StatusCodes.OK).json(vehicleUpdated);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all vehicles.
 *
 * @param req - The request object.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const getAllVehiclesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = getUserIdFromRequest(req, res);
        const vehicles = await VehicleService.getAllVehiclesByUserId(userId);
        res.status(StatusCodes.OK).json(vehicles);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a vehicle by its ID for the authenticated user.
 *
 * @param req - The request object containing the vehicle ID in the parameters.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const getVehicleByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = getUserIdFromRequest(req, res);
        const vehicle = await VehicleService.getVehicleById(req.params.id, userId);
        if (!vehicle) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' });
            return;
        }
        res.status(StatusCodes.OK).json(vehicle);
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a vehicle by its ID.
 *
 * @param req - The request object containing the vehicle ID in the parameters.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const deleteVehicleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = getUserIdFromRequest(req, res);
        const vehicle = await VehicleService.getVehicleById(req.params.id, userId);
        if (!vehicle) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' });
            return;
        }

        const result = await VehicleService.deleteVehicle(req.params.id);
        res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (error) {
        next(error);
    }
};