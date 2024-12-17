import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import { errorHandler } from './middleware/error-middleware.js';
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser('SECERT'));

app.use(cors({ origin: true, credentials: true }));
app.use('/api/user', userRoute);
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("hello world :)")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port http://localhost:${process.env.PORT}`);
})