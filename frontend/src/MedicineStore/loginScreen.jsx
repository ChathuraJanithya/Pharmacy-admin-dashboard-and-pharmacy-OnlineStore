import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    axios
      .post("http://localhost:8090/users/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          const userId = res.data._id; // Assuming the user ID is available in res.data._id

          // Set userId in sessionStorage
          //sessionStorage.setItem("_id", JSON.stringify(userId));

          // Navigate to home screen with userId as prop
          navigate("/medicineStore", { state: { userId } });
        } else if (res.data.token === false) {
          alert("Invalid Credentials"); // set error message
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}{" "}
        {/* Render error message */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
