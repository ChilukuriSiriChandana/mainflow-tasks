import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:4040/add')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const addTask = () => {
        if (newTask.trim() === '') return;

        axios.post('http://localhost:4040/add', { userAdd: newTask })
            .then(response => {
                fetchTasks();
                setNewTask('');
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };

    const deleteTask = (id) => {
      axios.delete(`http://localhost:4040/add/${id}`)
          .then(response => {
              fetchTasks();  // Refetch tasks after deletion
          })
          .catch(error => {
              console.error('Error deleting task:', error);
          });
  };
  
  

    return (
        <div className="container">
            <h1 className="my-4">To-Do List</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addTask}>Add</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.userAdd}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default App;
