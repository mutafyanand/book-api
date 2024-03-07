import express, { json } from 'express';
import cors from 'cors';
import http from 'http';

import routes from './routes';
import { PORT } from './utils/constants';
import { prisma } from './services/prisma';

const app = express();

app.use(cors());
app.use(json());
app.use('/', routes);

const main = async () => {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {

      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`[server]: Error on initializing server => ${e}`);
  }
};

main().then();