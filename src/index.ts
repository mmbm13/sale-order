/* eslint-disable no-console */
import app from './server';
import logger from './utils/logger';

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => logger.info(`Server on port: ${PORT}`));
