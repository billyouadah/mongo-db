import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  // Chargement initial des tâches
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle, completed: false, tag: "general" }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle("");
      } else {
        console.error("Failed to add task");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (response.ok) {
        fetchTasks(); // Re-fetch tasks to get updated data
      } else {
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const startEditing = (id) => {
    const task = tasks.find((task) => task._id === id);
    setEditTaskTitle(task.title);
    setIsEditing(id);
  };

  const editTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTaskTitle }),
      });
      if (response.ok) {
        fetchTasks(); // Re-fetch tasks to get updated data
        setIsEditing(null);
        setEditTaskTitle("");
      } else {
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks(); // Re-fetch tasks to get updated data
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <main>
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task._id)}
            />
            {isEditing === task._id ? (
              <>
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
                <button onClick={() => editTask(task._id)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </span>
                <button onClick={() => startEditing(task._id)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;