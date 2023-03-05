import { Sequelize } from 'sequelize-typescript';
import config from './config/database.config';

const env = process.env.NODE_ENV || 'development';
const options = (config as any)[env];

export const sequelize = new Sequelize({
  ...options,
  models: [__dirname + '/models/**/*.model.ts'],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')).replace(/-/g, '') ===
      member.toLowerCase()
    );
  },
});
