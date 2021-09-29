import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialContext } from "../App";
import Todo from "./Todo";
function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialContext);
  const logOut = () => {
    setCredentials(null);
  };

  return (
    <div>
      <h1>Welcome </h1>
      {credentials && (
        <button onClick={logOut} className="btn btn-danger">
          LogOut
        </button>
      )}

      <h2>{credentials && credentials.username}</h2>
      {!credentials && <Link to="/register">Register</Link>}
      {!credentials && <Link to="/login">Login</Link>}
      {credentials && <Todo />}
    </div>
  );
}

export default Welcome;
