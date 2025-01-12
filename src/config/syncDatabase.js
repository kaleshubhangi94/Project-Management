const sequelize = require('./database'); // Import your Sequelize instance
require('../models'); // Make sure the models are imported so Sequelize can sync them

(async () => {
  try {
    // This will create missing tables but won't delete existing ones
    await sequelize.sync();
    console.log('Database synced successfully.');
    process.exit(0); // Exit the script after syncing
  } catch (error) {
    console.error('Error syncing database:', error.message);
    process.exit(1); // Exit with error code
  }
})();
