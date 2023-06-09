import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser'

const app: Application = express();

// Cors
app.use(cors());
// Cookie parser
app.use(cookieParser());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1', routes);

//Global error handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: {
      path: req.originalUrl,
      message: 'API Not Found',
    },
  });
  next();
});


export default app;
