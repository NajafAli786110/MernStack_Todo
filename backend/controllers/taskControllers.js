const taskModel = require("../modal/taskModal");

// GET tasks
module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (err) {
    // Remove or customize console logging
    console.error("Failed to fetch tasks");
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// POST tasks
module.exports.postTasks = (req, res) => {
  const { taskName } = req.body;

  taskModel
    .create({ taskName })
    .then((data) => {
      console.log("Saved Successfully");
      res.status(201).json(data);
    })
    .catch((err) => {
      // Customize what is shown in the terminal and what is sent to the client
      console.error("Post unsuccessful:", err.message); // Optional: comment out to prevent logs
      res.status(400).json({ message: "Post unsuccessful", error: "Invalid input" });
    });
};

// UPDATE tasks
module.exports.updatedTasks = (req, res) => {
  const { id } = req.params;
  const { taskName } = req.body;

  taskModel
    .findByIdAndUpdate(id, { taskName }, { new: true, runValidators: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(updatedTask);
    })
    .catch((err) => {
      console.error("Update unsuccessful:", err.message); // Optional
      res.status(400).json({ message: "Update unsuccessful", error: "Validation error" });
    });
};

// DELETE tasks
module.exports.deleteTasks = (req, res) => {
  const { id } = req.params;

  taskModel
    .findByIdAndDelete(id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      console.error("Delete unsuccessful:", err.message); // Optional
      res.status(400).json({ message: "Delete unsuccessful", error: "Invalid request" });
    });
};
