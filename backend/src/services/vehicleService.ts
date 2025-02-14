import { VehicleModel, IVehicle } from '../models/Vehicle';

/**
 * Creates a new vehicle.
 * 
 * @param vehicleData - The data for the new vehicle.
 * @returns The created vehicle.
 * @throws {Error} If there is an error creating the vehicle.
 */
export const createVehicle = async (vehicleData: Partial<IVehicle>): Promise<IVehicle> => {
    try {
        const vehicle = new VehicleModel(vehicleData);
        return await vehicle.save();
    } catch (error) {
        throw new Error(`Error creating vehicle: ${(error as Error).message}`);
    }
};

/**
 * Updates an existing vehicle by its ID.
 * 
 * @param id - The ID of the vehicle to update.
 * @param updateData - The data to update the vehicle with.
 * @returns The updated vehicle.
 * @throws {Error} If the vehicle is not found or there is an error updating the vehicle.
 */
export const updateVehicle = async (id: string, updateData: Partial<IVehicle>): Promise<IVehicle | null> => {
    try {
        const vehicle = await VehicleModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        return vehicle;
    } catch (error) {
        throw new Error(`Error updating vehicle: ${(error as Error).message}`);
    }
};

/**
 * Retrieves all vehicles.
 * 
 * @returns An array of all vehicles.
 * @throws {Error} If there is an error fetching the vehicles.
 */
export const getAllVehicles = async (): Promise<IVehicle[]> => {
    try {
        return await VehicleModel.find();
    } catch (error) {
        throw new Error(`Error fetching vehicles: ${(error as Error).message}`);
    }
};

/**
 * Retrieves a vehicle by its ID.
 * 
 * @param id - The ID of the vehicle to retrieve.
 * @returns The vehicle corresponding to the provided ID.
 * @throws {Error} If the vehicle is not found or there is an error fetching the vehicle.
 */
export const getVehicleById = async (id: string): Promise<IVehicle | null> => {
    try {
        const vehicle = await VehicleModel.findById(id);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        return vehicle;
    } catch (error) {
        throw new Error(`Error fetching vehicle by ID: ${(error as Error).message}`);
    }
};

/**
 * Deletes a vehicle by its ID.
 * 
 * @param id - The ID of the vehicle to delete.
 * @returns A success message.
 * @throws {Error} If the vehicle is not found or there is an error deleting the vehicle.
 */
export const deleteVehicle = async (id: string): Promise<{ message: string }> => {
    try {
        const vehicle = await VehicleModel.findByIdAndDelete(id);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        return { message: 'Vehicle deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting vehicle: ${(error as Error).message}`);
    }
};