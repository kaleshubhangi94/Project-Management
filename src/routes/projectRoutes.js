// const express = require('express');
// const { createProject, getProjects, assignUser } = require('../controllers/projectController');
// const authenticate = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/', authenticate, createProject);
// router.get('/', authenticate, getProjects);
// router.post('/:projectId/users', authenticate, assignUser);

// module.exports = router;
const express = require('express');
const { createProject, getProjects, assignUser, getTasksByProject } = require('../controllers/projectController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Project
 *               description:
 *                 type: string
 *                 example: Project description
 *     responses:
 *       200:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/', authenticate, createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     description: Get all projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all projects
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, getProjects);
router.get('/:projectId', authenticate, getTasksByProject);


/**
 * @swagger
 * /api/projects/{projectId}/users:
 *   post:
 *     description: Assign a user to a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: User to be assigned to the project
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: User ID to assign
 *     responses:
 *       200:
 *         description: User assigned to the project
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Project not found
 */
router.post('/:projectId/users', authenticate, assignUser);

module.exports = router;
