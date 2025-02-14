import express from 'express';
import { validateId, validateVehicle } from '../validators/vehicleValidation';
import { createVehicleController, updateVehicleController, getAllVehiclesController, getVehicleByIdController, deleteVehicleController } from '../controllers/vehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a Vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *               - status
 *               - user_id
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: number
 *                 example: 2020
 *               status:
 *                 type: string
 *                 example: available
 *               user_id:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable Entity
 */
router.post('/vehicles', authMiddleware, validateVehicle, createVehicleController);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update a Vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *               - status
 *               - user_id
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: number
 *                 example: 2020
 *               status:
 *                 type: string
 *                 example: available
 *               user_id:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable Entity
 */
router.put('/vehicles/:id', authMiddleware, validateId, validateVehicle, updateVehicleController);

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all Vehicles
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vehicles
 *       404:
 *         description: Vehicles not found
 */
router.get('/vehicles', authMiddleware, getAllVehiclesController);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get Vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */
router.get('/vehicles/:id', authMiddleware, validateId, getVehicleByIdController);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete Vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */
router.delete('/vehicles/:id', authMiddleware, validateId, deleteVehicleController);

export default router;