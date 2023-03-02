import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, json, urlencoded } from 'express';
import helmet from 'helmet';
import routes from './routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(`${process.env.SERVER_PREFIX}`, routes);

export default app;
