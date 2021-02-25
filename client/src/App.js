import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState} from 'react'

function App() {
  const [jwtToken, setjwtToken] = useState("")

  const generateToken = () => {
    axios.post("http://localhost:5000/user/generateToken")
    .then(res =>  {
              console.log(res)
              setjwtToken(res.data)
          }
    )
    .catch(err => console.log(err))
  }

  const validateToken = () => {
    axios.get("http://localhost:5000/user/validateToken", {
      headers: {
        authorization: "Bearer " + jwtToken
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={() =>generateToken() }>
            Click Me to get jwt token
          </button>
          <br/>
          <button onClick={() => validateToken()}>
            Click me to check if token was valid
          </button>


      </header>
    </div>
  );
}

export default App;
