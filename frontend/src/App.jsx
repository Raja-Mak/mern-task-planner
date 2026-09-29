import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description
      });
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 MERN Task Planner</h1>
      
      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Add a New Task</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Task Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Task Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task._id} style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '6px', marginBottom: '10px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{task.title}</h4>
              <p style={{ margin: '0', color: '#666' }}>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;