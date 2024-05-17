import 'dotenv/config';
import express from 'express';
import db from './config/database.mjs';
import authRouter from './routes/authRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';
import roleRouter from './routes/roleRoutes.mjs';
import { verifyToken } from './middlewares/authMiddlewares.mjs';

const port = 3000;
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', authRouter);
app.use('/users', verifyToken, userRouter);
app.use('/roles', verifyToken, roleRouter);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

db.sync();

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
