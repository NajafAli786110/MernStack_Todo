const { Router } = require("express");
const { getTasks, postTasks, updatedTasks, deleteTasks } = require("../controllers/taskControllers");

const router = Router();

router.get("/tasks", getTasks);
router.post("/tasks", postTasks);
router.put("/tasks/:id", updatedTasks);
router.delete("/tasks/:id", deleteTasks);

module.exports = router;