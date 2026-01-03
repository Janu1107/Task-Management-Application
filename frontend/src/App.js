import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const login = async () => {
    const res = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };
  const getStatusCount = (status) =>
  tasks.filter(t => t.status === status).length;

  const chartData = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [
      {
        data: [
          getStatusCount("Todo"),
          getStatusCount("In Progress"),
          getStatusCount("Completed"),
        ],
        backgroundColor: ["#facc15", "#38bdf8", "#22c55e"],
      },
    ],
  };
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks`, {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post(
      `${API}/api/tasks`,
      { title },
      { headers: { Authorization: token } }
    );
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      <input
        placeholder="New task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
