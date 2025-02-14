import express from 'express';
import { createUserController, deleteUserController, getUserByIdController, getAllUsersController } from '../controllers/userController';
import { validateUserId, validateUserPOST } from '../validators/userValidation';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable Entity
 */
router.post('/users', validateUserPOST, createUserController);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       422:
 *         description: Unprocessable Entity
 */
router.get('/users/:id', validateUserId, getUserByIdController);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: Users not found
 */
router.get('/users', getAllUsersController);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       422:
 *         description: Unprocessable Entity
 */
router.delete('/users/:id', validateUserId, deleteUserController);

export default router;