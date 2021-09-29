import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CredentialContext } from "../App";
const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialContext);

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        {error ? (
          <div class="alert alert-danger">
            <strong>{error}</strong>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
        <Link to="/">Welcome</Link>
      </div>
    </>
  );
}

export default Login;
