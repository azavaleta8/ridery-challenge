import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for the User model
export interface IUser extends Document {
    email: string;
    password: string;
}

// Define the schema for the User model
const UserSchema: Schema<IUser> = new Schema({
    email: {
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

// Hash the password before saving the user
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Create the User model
export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);