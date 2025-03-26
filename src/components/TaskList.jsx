import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/task/taskSlice.js";
import styled from "styled-components";

const Container = styled.div`
  background: #2c3e50;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #ecf0f1;
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #34495e;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #ecf0f1;
  transition: all 0.3s;

  &:hover {
    background: #3d566e;
  }

  .task-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .task-text {
    font-weight: 500;
  }

  .task-meta {
    display: flex;
    gap: 10px;
    font-size: 0.8rem;
    color: #bdc3c7;
  }

  .priority {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .priority-high {
    background: #e74c3c;
    color: white;
  }

  .priority-medium {
    background: #f39c12;
    color: white;
  }

  .priority-low {
    background: #2ecc71;
    color: white;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  font-size: 1.2rem;
  transition: all 0.3s;

  &:hover {
    color: #c0392b;
  }
`;

function TaskList() {
  const tasks = useSelector((state) => state.tasks.todos);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      case "Low": return "priority-low";
      default: return "";
    }
  };

  return (
    <Container>
      <Header>
        <h3>{user?.name}'s Tasks</h3>
        <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
      </Header>
      
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <div className="task-info">
              <span className="task-text">{task.text}</span>
              <div className="task-meta">
                <span className={`priority ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
                {task.weather && <span>• {task.weather}</span>}
              </div>
            </div>
            <DeleteButton 
              onClick={() => dispatch(deleteTask(task.id))}
              aria-label="Delete task"
            >
              ×
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TaskList;