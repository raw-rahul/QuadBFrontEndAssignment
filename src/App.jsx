import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./app/store";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import styled from "styled-components";
import { logout } from "./features/auth/authSlice";
import { clearCurrentUser } from "./features/task/taskSlice";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #1e272e;
  color: #ecf0f1;
`;

const ContentContainer = styled.div`
  background: #2f3640;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  z-index: 100;

  &:hover {
    background: #c0392b;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 30%;
    left:220px;
    margin-bottom: 30px;
    display: block;
  }
  @media (min-width: 768px) and (max-width: 1024px)  {
    position: relative;
    width: 20%;
    left: 620px;
    margin-bottom: 30px;
    display: block;
  }
`;

const WelcomeMessage = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #f1c40f;
`;

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCurrentUser());
  };

  return (
    <AppContainer>
      {isAuthenticated && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>}
      
      <ContentContainer>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <>
            <WelcomeMessage>Welcome, {user?.name}!</WelcomeMessage>
            <TaskInput />
            <TaskList />
          </>
        )}
      </ContentContainer>
    </AppContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
