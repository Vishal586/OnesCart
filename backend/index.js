import express from 'express'
import dotenv from 'dotenv'
// Load environment variables FIRST before any other imports that might use environment variables
dotenv.config()

import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

let port = process.env.PORT || 6000

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:["https://onescart.onrender.com" , "https://onescart-admin.onrender.com"],
 credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

app.get("/", (req, res) => {
  res.send("OneCart Backend API is running successfully 🚀");
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    connectDb()
})
