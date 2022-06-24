import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import Protect from './middleware/authMiddleware.js'
import { errorHandler, notFound } from './middleware/errorMiddleweare.js'
import noteRoutes from './routes/noteRoute.js'

const app = express()
dotenv.config()
connectDB()
app.use(cors());
app.use(express.json())


app.use("/api/users",userRouter)
app.use("/api/notes", noteRoutes); 
app.use("/api/notes/create", Protect, noteRoutes);
 
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 4000

app.listen(PORT,console.log(`Server running on port ${PORT}`))