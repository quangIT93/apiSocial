import { Express } from 'express';
import authRoute from './authRoute';
import friendRoute from './friendRoute';
import postRoute from './postRoute';

function route(app: Express) {
  app.use('/api/auth', authRoute);
  app.use('/api/post', friendRoute);
  app.use('/api/post', postRoute);
}

export default route;
