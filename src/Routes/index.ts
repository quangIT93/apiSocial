import { Express } from 'express';
import authRoute from './authRoute';

function route(app: Express) {
  app.use('/api/auth', authRoute);
}

export default route;
