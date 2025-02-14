import createApp from './config/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ENV
dotenv.config({ path: '../.env' });

// Mongoose config
mongoose.set('strictQuery', false);

const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.RENDER_EXTERNAL_URL || 'localhost';
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined.');
    process.exit(1);
}

/**
 * Connects to the MongoDB database using the provided URI.
 * 
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 * @throws Will log an error message and exit the process if the connection fails.
 */
export const connectToDatabase = async (): Promise<void> => {
    try {
        
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB initialized successfully:', mongoose.connection.host);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await connectToDatabase();

        const app = await createApp();
        app.listen(PORT, () => {
            if (NODE_ENV === 'production') {
                console.log(`Server running on ${HOST} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at ${HOST}/docs`);
            } else {
                console.log(`Server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at http://${HOST}:${PORT}/docs`);
            }
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();