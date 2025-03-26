import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { setUser } from "../features/task/taskSlice";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  color: black;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  color: black;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 95%;
  padding: 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;
    
    dispatch(login({ name, password }));
    dispatch(setUser(name));
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <label>Username</label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
}

export default Login;