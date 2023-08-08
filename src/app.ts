import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import express, { Application } from 'express';
// import ApiError from './errors/ApiError'
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
// eslint-disable-next-line no-console
console.log(app.get('env'));
app.use('/api/v1/users/', UserRoutes);

// Testing
// app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
//   // eslint-disable-next-line no-undef
//   console.log(x)
// })

app.use(globalErrorHandler);

export default app;
