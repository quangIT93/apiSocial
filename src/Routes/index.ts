import { Express } from 'express';
import authRoute from './authRoute';
import friendRoute from './friendRoute';
import postRoute from './postRoute';
import commentRoute from './commentRoute';
import chatRoute from './chatRoute';
import likeRoute from './likeRoute';
import messageRoute from './messageRoute';
import educationRoute from './educationRoute';
import productRoute from './productRoute';
import shoppingRoute from './shoppingRoute';
import storeRoute from './storeRoute';

function route(app: Express) {
  app.use('/api/auth', authRoute);
  app.use('/api/post', friendRoute);
  app.use('/api/post', postRoute);
  app.use('/api/post', commentRoute);
  app.use('/api/post', likeRoute);
  app.use('/api/post', messageRoute);
  app.use('/api/post', educationRoute);
  app.use('/api/post', productRoute);
  app.use('/api/post', shoppingRoute);
  app.use('/api/post', storeRoute);
  app.use('/api/post', chatRoute);
}

export default route;
