import { sequelize } from './database';
import app from './server';
import logger from './utils/logger';
import populate from './utils/populate-tables';

const PORT = process.env.SERVER_PORT || 3001;

(async () => {
  try {
    await sequelize.sync({ force: true });
    await populate();
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
  app.listen(PORT, () => logger.info(`Server on port: ${PORT}`));
})();
