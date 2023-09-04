import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/NoteContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const context = useContext(noteContext)
  const { showAlert } = context;
  let navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    setCredentials({ email: credentials.email, password: "" });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("auth-token", result.authToken);
      showAlert("LogIn Successful", "success");
      navigate("/");
    } else {
      return showAlert(result.error, "danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="container" style={{ marginTop: "50px" }}>
        Login
      </h1>
      <form className="container my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
