const express = require('express');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('./models'); 

const app = express();


app.use((req, res, next) => {
  console.log('Incoming Request Headers:', req.headers);
  next();
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Project Management API',
      description: 'API for managing users, projects, and tasks',
      version: '1.0.0',
    },
    basePath: '/',
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',  
        description: 'JWT authorization using Bearer token',
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/*.js','./src/routes/projectRoutes.js'],  
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(express.json());
// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Sync DB and start server
(async () => {
    try {
      await sequelize.sync({ force: false });
      console.log('Database synced successfully.');
    } catch (err) {
      console.error('Error syncing database:', err.message);
    }
  })();

module.exports = app;
