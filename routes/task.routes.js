const express = require("express");
const router = express.Router();

const taskController = require('../controllers/task.controller');

router.get("/tasks", taskController.getAllTask);

router.get("/:id", taskController.getTask);

router.post("/", taskController.newTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;