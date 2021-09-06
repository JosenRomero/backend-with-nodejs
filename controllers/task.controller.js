const mongoose = require("mongoose");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.getAllTasks = async (req, res, next) => {

    try {

        // return all user Tasks
        const tasks = await Task.aggregate([
            {
                $match: {
                    // get "api/task/all/userId/:userId"
                    userId: mongoose.Types.ObjectId(req.params.userId)
                }  
            }
        ]);

        res.status(200).json({tasks});

    } catch(err) {
        next({error: err, message: "Failed to get user Tasks", status: 404});
    }

}

exports.getTask = async (req, res, next) => {

    try {

        const oneTask = await Task.findById(req.params.id);

        res.status(200).json({oneTask});

    } catch(err) {
        next({error: err, message: "Failed to get task", status: 404});
    }

}

exports.newTask = async (req, res, next) => {

    try {

        const { userId, title, description, publicTask, likers } = req.body;

        const task = new Task({
            userId,
            title,
            description,
            publicTask,
            likers
        });

        const result = await task.save();
		
        res.status(201).json({message: "Task Saved", newTask: result});

    } catch(err) {
        next({error: err, message: "Failed to new task", status: 500});
    }

}

exports.updateTask = async (req, res, next) => {

    try {

        const { title, description, publicTask } = req.body;

        const task = { title, description, publicTask }

		//  options {new: true}, will give you the object after update was applied
        const result = await Task.findByIdAndUpdate(req.params.id, task, {new: true});
		
        res.status(200).json({message: "Task Updated", task: result});

    }catch(err) {
        next({error: err, message: "Failed to update task", status: 500});
    }

}

exports.deleteTask = async (req, res, next) => {

    try {

        await Task.findByIdAndRemove(req.params.id);

        res.status(200).json({message: "Task Deleted"});

    }catch(err) {
        next({error: err, message: "Failed to delete task", status: 500});
    }

}

exports.deleteAllTasks = async (req, res, next) => {

    try {

        // delete "api/task/all/userId/:userId"
        await Task.deleteMany({userId: req.params.userId});

        res.status(200).json({message: "All Tasks Deleted"});

    }catch(err) {
        next({error: err, message: "Failed to delete all tasks", status: 500});
    }

}