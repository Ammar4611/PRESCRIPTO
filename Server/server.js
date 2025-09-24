import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDb from './Config/Mongodb.js'
import router from './Routes/AuthRouter.js'
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";
import AppointmentRouter from './Routes/AppointmentsRoutes.js'

const port= process.env.PORT

const app = express();
const __dirname = path.resolve();

// This will make http://localhost:5000/uploads/<filename> work
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);



app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

connectDb();

app.use('/auth',router)
app.use('/appointments' , AppointmentRouter)



app.listen(port, ()=>{console.log(`Server is running on port${port}`)})