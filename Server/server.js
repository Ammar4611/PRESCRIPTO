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

const port= process.env.PORT || 8080;

const app = express();
const __dirname = path.resolve();

// This will make http://localhost:5000/uploads/<filename> work
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


const allowedOrigins = [
  'http://localhost:5173',
  'https://prescripto-project-ruby.vercel.app' // add your real frontend URL here
];

app.use(express.json());

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());

connectDb();

app.get('/', (req, res) => {
  res.send('Server is running');
});


app.use('/auth',router)
app.use('/appointments' , AppointmentRouter)


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
