import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ridery Challenge API',
            version: '1.0.0',
            description: 'API documentation',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/**/*.ts'], // Asegúrate de que esta ruta apunte a tus archivos de rutas
    persistAuthorization: true,
};

export default swaggerOptions;
