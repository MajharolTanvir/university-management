import express, { Application } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/AcademicSemester/academicSemester.route';

const app: Application = express();

app.use(cors());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'))
// })

//Global error handler
app.use(globalErrorHandler);

export default app;
