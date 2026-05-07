import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/db.js'
import routes from './routes/routes.js'
dotenv.config()

const app = express()
app.use(express.json())
await dbConnect()

app.use('/api/auth', routes)
app.use('/api/tasks', routes)


app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`)
})