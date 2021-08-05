const mongoose = require("mongoose");

const Task = require("../models/taskModel");

exports.getTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        res.json(task);

    } catch(err) {

        console.error("Failed!!!");

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