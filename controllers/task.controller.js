const mongoose = require("mongoose");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.getAllTasks = async (req, res) => {

    try {

        // retornará todas las tasks de un user
        const tasks = await Task.aggregate([
            {
                $lookup: { 
                    from: User.collection.name, // userModel
                    localField: "userId", // taskModel
                    foreignField: "_id", // userModel
                    as: "userTasks" // alias
                }
            },
            {
                $unwind: "$userTasks"
            },
            /*
            {
                $project: {
                    _id: 0
                }
            },*/
            {
                $match: {
                    // req.params.userId -> hace referencia a la ruta: "api/task/all/userId/:userId"
                    userId: mongoose.Types.ObjectId(req.params.userId)
                }
            }
        ])
		
        res.json(tasks);

    } catch(err) {

        console.error("Failed to get user Tasks");

    }

}

exports.getTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        res.json(task);

    } catch(err) {

        console.error("Failed to task");

    }

}

exports.newTask = async (req, res) => {

    try {

        const { userId, title, description, publicTask, likers } = req.body;

        const task = new Task({
            userId,
            title,
            description,
            publicTask,
            likers
        });

        await task.save();
		
        res.json({status: "Task Saved"});

    } catch(err) {
        console.error("Failed to new task");
    }

}

exports.updateTask = async (req, res) => {

    try {

        const { title, description, publicTask } = req.body;

        const task = { title, description, publicTask }

        await Task.findByIdAndUpdate(req.params.id, task);

        res.json({status: "Task Updated"});

    }catch(err) {
        console.error("Failed to update task");
    }

}

exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndRemove(req.params.id);

        res.json({status: "Task Deleted"});

    }catch(err) {
        console.error("Failed to delete task");
    }

}