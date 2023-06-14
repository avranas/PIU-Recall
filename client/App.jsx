import React, { useEffect, useState } from 'react';

//TODO NEXT: Connect to a database
//Wireframe project

function App() {
  const [serverResponse, setServerResponse] = useState();
  useEffect(() => {
    async function getHelloWorld() {
      const response = await fetch('/test');
      const text = await response.text();
      console.log(text);

      setServerResponse(text);
    }
    getHelloWorld();
  }, []);
  return (
    <div>
      <h1>{serverResponse}</h1>
      <h2>@@@</h2>
    </div>
  );
}

export default App;
