import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

// Define the interface for the Vehicle model
export interface IVehicle extends Document {
    brand: string;
    model: string;
    year: number;
    status: 'available' | 'in_maintenance' | 'in_service';
    user_id: IUser['_id'];
}

// Define the schema for the Vehicle model
const VehicleSchema: Schema<IVehicle> = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1886, // Year of the first automobile
        max: new Date().getFullYear() + 1 // Current year + 1
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'in_maintenance', 'in_service']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Create the Vehicle model
export const VehicleModel: Model<IVehicle> = mongoose.model<IVehicle>('Vehicle', VehicleSchema);