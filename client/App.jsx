import React, { useEffect, useState } from 'react';

//TODO NEXT:
//Wireframe project

function App() {
  const [serverResponse, setServerResponse] = useState();
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  useEffect(() => {
    async function getHelloWorld() {
      const response = await fetch('/test');
      const text = await response.text();
      console.log(text);

      setServerResponse(text);
    }
    getHelloWorld();
  }, []);

  function login() {
    console.log(usernameInput)
    console.log(passwordInput)
    const body = {
      username: usernameInput,
      password: passwordInput
    }
    const response = fetch('/login', body);
    console.log(response);
    //TODO NEXT: Come back after I handle logging in
    //Passport.js is next, then registering, then front end
  }
  return (
    <div>
      <h1>PIU Recall</h1>
      <div id="username-input">
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsernameInput(e.target.value)}
        ></input>
      </div>
      <div id="password-input">
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPasswordInput(e.target.value)}
        ></input>
      </div>
      <button onClick={login}>Log in</button>
      <footer>
        <p>Made with ❤️ by Alex Vranas</p>
      </footer>
    </div>
  );
}

export default App;
