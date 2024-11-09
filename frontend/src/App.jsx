import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/tasks/");
        setTasks(response.data);
        console.log("Tasks fetched successfully");
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTaskName.trim()) {
      alert("Task name cannot be empty");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/api/tasks/", {
        taskName: newTaskName,
      });
      setTasks([...tasks, response.data]);
      setNewTaskName("");
      console.log("Task added successfully");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Delete a task by ID
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      console.log("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Enter edit mode
  const handleEdit = (task) => {
    setEditMode(task._id);
    setEditedTaskName(task.taskName);
  };

  // Submit edited task
  const handleEditSubmit = async (id) => {
    if (!editedTaskName.trim()) {
      alert("Task name cannot be empty");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5001/api/tasks/${id}`,
        {
          taskName: editedTaskName,
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditMode(null);
      console.log("Task edited successfully");
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          My Todo App
        </h1>
      </header>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Input Section */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              className="p-4 bg-gray-100 rounded-md flex justify-between items-center"
              key={task._id}
            >
              {editMode === task._id ? (
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
              ) : (
                <span className="text-gray-700">{task.taskName}</span>
              )}
              <div className="flex space-x-2">
                {editMode === task._id ? (
                  <button
                    onClick={() => handleEditSubmit(task._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer/Stats */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">{tasks.length} tasks total</p>
        </div>
      </div>
    </div>
  );
}

export default App;
