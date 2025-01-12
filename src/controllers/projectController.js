const { Task } = require('../models');
const Project = require('../models/project');
const User = require('../models/user');

const createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const project = await Project.create({ title });

    res.status(201).json({ message: 'Project created', project });
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ include: User });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

const assignUser = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);

    if (!project || !user) return res.status(404).json({ message: 'Project or User not found' });

    await project.addUser(user);  // This will add the user to the project (many-to-many)
    res.json({ message: 'User assigned to project' });
  } catch (err) {
    res.status(400).json({ message: 'Error assigning user', error: err.message });
  }
};

// Get all tasks for a specific project
const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Project.findByPk(projectId, {
      include: {
        model: Task,
        where: { projectId },
        required: false, // If no tasks are found, return an empty array
      }
    });

    if (!tasks) return res.status(404).json({ message: 'Project not found' });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

module.exports = { createProject, getProjects, assignUser, getTasksByProject };
