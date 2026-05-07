import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type : String,
        default: "pending"
    },
    priority:{
        type : String
    },
    deadline: {
        type: String,
        require : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}, { timestamps: true })


export const Task = mongoose.model("Product", TaskSchema)