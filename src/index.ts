import express, { Request, Response } from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

import route from './Routes';

require('dotenv').config();
//connect Database
import DB from './ConnectDatabase';
DB.connectDB();

app.use(bodyParser.json());
route(app);

// chuyen doi json
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});
