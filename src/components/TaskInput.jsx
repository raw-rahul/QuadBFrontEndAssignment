import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setWeather } from "../features/task/taskSlice.js";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #2c3e50;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }

  .input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    color: #ecf0f1;
    font-size: 14px;
  }

  input, select {
    padding: 12px;
    border: none;
    border-radius: 5px;
    background: #34495e;
    color: white;
    font-size: 16px;
    transition: all 0.3s;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3498db;
    }
  }

  button {
    padding: 12px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;

    &:hover {
      background: #2980b9;
    }
  }
`;

function TaskInput() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.tasks.weather);

  const fetchWeather = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${apikey}`
      );
      const weatherDesc = response.data.weather[0].description;
      const tempKelvin = response.data.main.temp;
      const tempCelsius = (tempKelvin - 273.15).toFixed(2); 
      return `${weatherDesc}, ${tempCelsius}°C`;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return "Weather unavailable";
    }
  };

  const addTaskHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const weatherData = await fetchWeather();
    dispatch(setWeather(weatherData));
    
    const newTask = {
      id: Date.now(),
      text: input,
      priority,
      weather: weatherData,
      createdAt: new Date().toISOString()
    };
    
    dispatch(addTask(newTask));
    setInput("");
  };

  return (
    <Form onSubmit={addTaskHandler}>
      <div className="input-group">
        <label htmlFor="task-input">New Task</label>
        <input
          id="task-input"
          type="text"
          placeholder="Enter a Task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="priority-select">Priority</label>
        <select 
          id="priority-select"
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      
      <button type="submit">Add Task</button>
    </Form>
  );
}

export default TaskInput;