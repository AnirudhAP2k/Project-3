import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/NoteContext";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const context = useContext(noteContext);
  const { showAlert } = context;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.cPassword === credentials.password) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      // setCredentials({name: credentials.name, email: credentials.email, password: "", cPassword: credentials.cPassword})
      const result = await response.json();
      if (result.success) {
        showAlert("Created Account Successfully. Please Log In", "success");
        navigate("/login");
      } else {
        console.log(result);
        return showAlert(result.error, "danger");
      }
    } else {
      setCredentials({
        name: credentials.name,
        email: credentials.email,
        password: "",
        cPassword: "",
      });
      return showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="container" style={{ marginTop: "50px" }}>
        SignUp
      </h1>
      <form className="container my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={onChange}
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cPassword"
            id="cPassword"
            onChange={onChange}
            value={credentials.cPassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
