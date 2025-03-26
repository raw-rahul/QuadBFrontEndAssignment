import { createSlice } from "@reduxjs/toolkit";

const getStoredTasks = (username) => {
  try {
    const allTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
    return allTasks[username] || [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const saveTasksToStorage = (username, tasks) => {
  try {
    const allTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
    allTasks[username] = tasks;
    localStorage.setItem("userTasks", JSON.stringify(allTasks));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    todos: [],
    weather: null,
    currentUser: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.todos = getStoredTasks(action.payload);
    },
    addTask: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
        saveTasksToStorage(state.currentUser, state.todos);
      },
      prepare: (taskData) => {
        return {
          payload: {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            completed: false,
            ...taskData
          }
        };
      }
    },
    updateTask: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
        saveTasksToStorage(state.currentUser, state.todos);
      }
    },
    deleteTask: (state, action) => {
      state.todos = state.todos.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.currentUser, state.todos);
    },
    toggleTask: (state, action) => {
      const task = state.todos.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.currentUser, state.todos);
      }
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    clearCompletedTasks: (state) => {
      state.todos = state.todos.filter(task => !task.completed);
      saveTasksToStorage(state.currentUser, state.todos);
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.todos = [];
    }
  }
});

export const {
  setUser,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setWeather,
  clearCompletedTasks,
  clearCurrentUser
} = taskSlice.actions;

export default taskSlice.reducer;