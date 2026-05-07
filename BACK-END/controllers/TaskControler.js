import { Task } from "../models/TaskModel.js"


export const Create = async (req, res) => {
    try {
        const { title, description, status, priority, deadline, user } = req.body

        if (!title || !description || !priority || !deadline || !user) {
            return res.status(400).json({
                status: false,
                message: "Fill All Details"
            })
        }

        const ExitsTask = await Task.findOne({ title })
        if (ExitsTask) {
            return res.status(400).json({
                status: false,
                message: "Task Already Created"
            })
        }

        const newProduct = await Task({ title, description, status, priority, deadline, user })
        await newProduct.save()

        return res.status(201).json({
            status: true,
            message: "Task Created Succesfully!",
            data: newProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Task Create Failed ${error.message}`
        })
    }
}


export const Get = async (req, res) => {
    try {

        const { search, sort, status , priority} = req.query
        let { page, limit } = req.query

        page = parseInt(page) || 1
        limit = parseInt(limit) || 5


        let query = {}

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } }
                ]
            }
        }

        if(priority){
            query.priority = priority
        }

        if(status){
            query.status = status
        }

        let sortOption = {}

        if (sort) {
            sortOption[sort] = status === "pending" ? -1 : 1
        }

        const skip = (page - 1) * limit
        const ExitsTask = await Task.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)

        const total = await Task.countDocuments(query)

        return res.status(200).json({
            status: true,
            message: "Task Get Succesfully!",
            data: ExitsTask,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Task Get Failed ${error.message}`
        })
    }
}

export const SingleGet = async (req, res) => {
    try {
        const { id } = req.params

        const ExitsTask = await Task.findById(id)
        if (!ExitsTask) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Single Task Get Succesfully!",
            data: ExitsTask
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Task Single Get Failed ${error.message}`
        })
    }
}

export const Update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, status, priority, deadline, user } = req.body

        const ExitsTask = await Task.findByIdAndUpdate(id, { title, description, status, priority, deadline, user }, { new: true })
        if (!ExitsTask) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found"
            })
        }

        return res.status(200).json({
            status: false,
            message: "Task Update Succesfully!",
            data: ExitsTask
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Task Update Failed ${error.message}`
        })
    }
}


export const Delete = async (req, res) => {
    try {
        const { id } = req.params

        const ExitsTask = await Task.findByIdAndDelete(id)
        if (!ExitsTask) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Task Delete Succesfully!",
            data: ExitsTask
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Task Delete Failed ${error.message}`
        })
    }
}