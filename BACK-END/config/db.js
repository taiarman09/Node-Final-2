import mongoose from "mongoose"


export const dbConnect = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo DB is Connect")
    } catch (error) {
        console.log(`Mongo DB is Not Connect ${error.message}`)
    }
}