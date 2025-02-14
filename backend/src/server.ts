import createApp from './config/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.RENDER_EXTERNAL_URL || 'localhost';
// const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
// const MONGODB_URI_TEST: string | undefined = process.env.MONGODB_URI_TEST;

// ENV
dotenv.config();


const startServer = async () => {
    try {
        // await connectToDatabase();

        const app = await createApp();
        app.listen(PORT, () => {
            if (NODE_ENV === 'production') {
                console.log(`Server running on ${HOST} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at ${HOST}/api-docs`);
            } else {
                console.log(`Server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at http://${HOST}:${PORT}/api-docs`);
            }
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();