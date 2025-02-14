import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions';
import * as middlewares from '../middlewares/errorHandle';
import { apiLimiter } from './rateLimit';

import healthRouter from '../routes/healthRouter';
import userRouter from '../routes/userRouter';
import authRouter from '../routes/authRouter';
import vehicleRouter from '../routes/vehicleRouter';

/**
 * Creates and configures an Express application.
 *
 * This function sets up middleware for JSON parsing, logging, CORS, and rate limiting.
 * It also configures Swagger for API documentation and sets up the health check route.
 * Additionally, it defines a root route that returns a JSON message indicating the API is running.
 * Error handling middleware for 404 and general errors are also included.
 *
 * @returns {Application} The configured Express application.
 */
const createApp = (): Application => {
    const app: Application = express();

    // Middleware
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors());
    app.use(apiLimiter);

    // Swagger Config
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Routes
    app.use('', healthRouter);
    app.use('/auth', authRouter);
    app.use('/api', userRouter);
    app.use('/api', vehicleRouter);

    // Root route
    app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'Ridery Code Challenge API is running' });
    });

    // Error handling middlewares
    app.use(middlewares.notFoundMiddleware);
    app.use(middlewares.errorHandlerMiddleware);

    return app;
};

export default createApp;