import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/login.css";

function Login() {
  const [startLogin, setStartLogin] = useState(false);
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, user } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/auth/login",
        { type, email, password },
        { withCredentials: true }
      )
      .then((res) => {
        const data = res.data;
        login(data.user);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function handleStartLogin(e) {
    if (startLogin) {
      setStartLogin(false);
      setType("");
      setEmail("");
      setPassword("");
    } else {
      setStartLogin(true);
      setType(e.target.name);
    }
  }

  return isLoggedIn ? (
    <Navigate replace to={`/${user.type.toLowerCase()}-dashboard`} />
  ) : (
    <div className="form-container">
      {startLogin ? (
        <div className="login-container">
          <Button name={type} onClick={handleStartLogin}>
            {`Login as ${type}`}
          </Button>
          <Form className="login-form" onSubmit={handleLogin}>
            <Input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Input type="submit" value="Login" />
            <br />
          </Form>
        </div>
      ) : (
        <div className="login-container">
          <Button name="Student" onClick={handleStartLogin}>
            Login as Student
          </Button>
          <br />
          <Button name="Teacher" onClick={handleStartLogin}>
            Login as Teacher
          </Button>
          <br />
          <Button name="Admin" onClick={handleStartLogin}>
            Login as Admin
          </Button>
          <br />
        </div>
      )}
    </div>
  );
}

export default Login;
