import React, { useEffect, useState } from "react";
import axios from "axios";
import cors from "cors";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassowrd, setRePassword] = useState("");
  let userid = null;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != rePassowrd) {
      alert("Passwords are not same");
    } else {
      const data = { username, password };
      var res = await fetch(`http://localhost:7700/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        mode: "cors",
        body: JSON.stringify(data),
      });
      const userdata = await res.json();
      console.log(userdata);
      alert('Login Now');
      navigate('/login');
    }
  };
  return (
    <div>
      <div>REGISTER</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          placeholder="Confirm-Password"
          type="password"
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
        />
        {/* <Link to={`/mainpage/${userid}`}> */}
        <button type="submit">Submit</button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default Register;
