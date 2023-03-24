import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import outgoingRoutes from "./routes/outgoingRoutes.js";

dotenv.config()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRoutes)
app.use('/car', carRoutes)
app.use('/outgoing', outgoingRoutes)


const start = async () => {
    try {
        await mongoose.connect(DB_URL).then( () => console.log("\nDB Connected"))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

await start()