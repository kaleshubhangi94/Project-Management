// const express = require('express');
// const { login, register } = require('../controllers/authController'); // Ensure these are correct

// const router = express.Router();

// router.post('/register', register); // Define a POST route for register
// router.post('/login', login);       // Define a POST route for login

// module.exports = router;
const express = require('express');
const { login, register } = require('../controllers/authController');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Register a new user
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid request
 */
router.post('/register', register);
router.get("/",getUsers);
router.post("/create-user",createUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login an existing user
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post('/login', login);

module.exports = router;
