import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [usernameInput, setUsernameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
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

    async function register() {
      try {
        const body = {
          username: usernameInput,
          password: passwordInput
        }
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        navigate('/login-page');
      } catch (err) {
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
      <button onClick={register}>Register</button>
      </div>
      <div>
        <p>Already have an account?</p>
        <Link to="/login-page">Log in</Link>
      </div>

    </div>
  );
}

export default Register;
