const express = require("express");
const router = express.Router();

const taskController = require('../controllers/task.controller');

router.get("/all/userId/:userId", taskController.getAllTasks);

router.get("/:id", taskController.getTask);

router.post("/", taskController.newTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

router.delete("/all/userId/:userId", taskController.deleteAllTasks);

module.exports = router;