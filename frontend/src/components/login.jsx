import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const submit = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    axios.post('login', data)
        .then(res =>{
          localStorage.setItem('token', res.data.token);
          if(res.data.token){
            setRedirect(true);
          }
        })
        .catch(err =>{
          console.log(err)
        })
  }

  if(redirect){
    return <Redirect to="/home"/>
  }

  return (

      <div className = "login">
      <form onSubmit = {submit}>
        <h1 className="h3 mb-3 fw-normal">Log in</h1>
          <input type="email" className="form-control" placeholder="name@example.com"
          onChange = {e => setEmail(e.target.value)}/>
          <input type="password" className="form-control"  placeholder="Password"
          onChange = {e => setPassword(e.target.value)}/>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
      </div>
  );
};

export default Login;
