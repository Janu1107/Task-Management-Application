const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    await Task.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
