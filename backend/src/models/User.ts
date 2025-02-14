import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the User model
export interface IUser extends Document {
    username: string;
    password: string;
}

// Define the schema for the User model
const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the User model
export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);