import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as VehicleService from '../services/vehicleService';

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
        const vehicle = await VehicleService.updateVehicle(req.params.id, req.body);
        if (!vehicle) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' });
        }
        res.status(StatusCodes.OK).json(vehicle);
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
        const vehicles = await VehicleService.getAllVehicles();
        res.status(StatusCodes.OK).json(vehicles);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a vehicle by its ID.
 *
 * @param req - The request object containing the vehicle ID in the parameters.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const getVehicleByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const vehicle = await VehicleService.getVehicleById(req.params.id);
        if (!vehicle) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' });
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
        const result = await VehicleService.deleteVehicle(req.params.id);
        res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (error) {
        next(error);
    }
};