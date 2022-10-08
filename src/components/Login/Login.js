import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };
    let userid=null;
    // const form=new formData();
    // form.append(username);
    // form.append()
    const res = await fetch(`http://localhost:7700/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data),
    });
    console.log('hi');
    const login_cred = await res.json();
    console.log(login_cred);
    userid = login_cred.details._id;
    const token =login_cred.token
    window.localStorage.setItem('token',token);
    navigate(`/mainpage?id=${userid}`);
  };
  return (
    <div>
      <div className="login">LOGIN</div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
