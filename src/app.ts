import express, { Application } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes/routes';
const app: Application = express();

app.use(cors());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1', routes);

//Global error handler
app.use(globalErrorHandler);

export default app;
