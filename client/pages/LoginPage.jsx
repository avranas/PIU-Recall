import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // TODO: BAD NOT DRY CODE FIX THIS
  useEffect(() => {
    async function goToSongListIfAlreadyLoggedIn() {
      const response = await fetch('/users');
      const text = await response.text();
      // If a User exists, navigate to song list
      if (response.status === 200) {
        navigate('/song-list')
      }
    }
    goToSongListIfAlreadyLoggedIn();
  }, []);

  async function login() {
    if (usernameInput === '' || passwordInput === '') return;
    setUsernameInput('');
    setPasswordInput('');
    try {
      const body = {
        username: usernameInput,
        password: passwordInput,
      };
      console.log(body);
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.status !== 200)
        throw {
          response: response,
          message: 'Something went wrong logging in',
        };
      navigate('/song-list');
    } catch (err) {
      setLoginError('Username or password is incorrect')
      console.log(err);
    }
  }

  return (
    <div>
      <div className="username-input">
        <label htmlFor="username">User Name</label><br/>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsernameInput(e.target.value)}
        ></input>
      </div>
      <div className="password-input">
        <label htmlFor="password">Password</label><br/>
        <input
          type="password"
          id="password"
          onChange={(e) => setPasswordInput(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={login}>Log in</button>
      </div>
      {
        loginError ? (
          <p id='error-text'>{loginError}</p>
        ) : null
      }
      <div>
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
export default Login;
