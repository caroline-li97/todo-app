import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // get all the task
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // add task
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await axios.post('http://localhost:3000/tasks', { task: newTask });
        setNewTask('');
        fetchTasks(); // get task list
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks(); // get task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // get task list during loading
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {task.task}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;