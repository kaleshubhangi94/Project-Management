const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// Relationships
User.belongsToMany(Project, { through: 'UserProjects' });
Project.belongsToMany(User, { through: 'UserProjects' });
Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = { User, Project, Task };
