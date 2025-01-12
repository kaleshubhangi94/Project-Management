const Task = require('../models/task');
const Project = require('../models/project');

const createTask = async (req, res) => {
  try {
    const { title, description, projectId } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({ title, description, projectId });
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
};

// Get all tasks for a specific project
const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.findAll({ where: { projectId } });
    if (tasks.length === 0) return res.status(404).json({ message: 'No tasks found for this project' });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

module.exports = { createTask, getTasksByProject };
