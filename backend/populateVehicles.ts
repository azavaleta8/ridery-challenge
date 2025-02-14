import mongoose, { connect } from 'mongoose';
import { createVehicle } from './src/services/vehicleService';
import { IVehicle } from './src/models/Vehicle';
import { UserModel } from './src/models/User';
import { connectToDatabase } from './src/server';

const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
const models = ['Corolla', 'Civic', 'Mustang', 'Camaro', 'Altima'];
const statuses = ['available', 'in_maintenance', 'in_service'];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomYear = () => Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990;

const createRandomVehicle = (userId: string): Partial<IVehicle> => ({
    brand: getRandomElement(brands),
    vehicleModel: getRandomElement(models),
    year: getRandomYear(),
    status: getRandomElement(statuses) as 'available' | 'in_maintenance' | 'in_service',
    user_id: userId
});

const populateVehicles = async () => {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');

        const users: Array<{ _id: mongoose.Types.ObjectId }> = await UserModel.find();
        if (users.length === 0) {
            console.error('No users found in the database. Please create some users first.');
            process.exit(1);
        }

        const userId = users[0]._id.toString(); // Use the first user found in the database

        for (let i = 0; i < 300; i++) {
            const vehicleData = createRandomVehicle(userId);
            await createVehicle(vehicleData);
            console.log(`Created vehicle ${i + 1}`);
        }

        console.log('Successfully populated 300 vehicles');
        process.exit(0);
    } catch (error) {
        console.error('Error populating vehicles:', error);
        process.exit(1);
    }
};

populateVehicles();