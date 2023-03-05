import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, json, urlencoded } from 'express';
import helmet from 'helmet';
import { serve, setup } from 'swagger-ui-express';
import errorMiddleware from './middlewares/error.middleware';
import routes from './routes';

dotenv.config();

const app: Express = express();
const url = `${process.env.SERVER_PREFIX}${process.env.SERVER_VERSION}`;

app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
  `${url}/docs`,
  serve,
  setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.use(url, routes);

app.use(errorMiddleware);

export default app;
