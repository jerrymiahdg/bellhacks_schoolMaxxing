// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState("Jeremiah")
  const [lastName, setLastName] = useState("de Guzman")
  const [username, setUsername] = useState("jerrymiah.dg")
  const [password, setPassword] = useState("kingbebop")

  useEffect(() => {
    fetch("/users/getUsers")
    .then((res) => res.json()
    .then((data) => {
      setUsers(data)
      console.log(data)
    }))
    .catch((err) => console.log(err))
  }, [])

  const clickHandler = () => {
    fetch("/users/createUsers", {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  return (
    <div className="App">
      Users:
      {users.map((user) => <p>{user.username}</p>)}
      <button onClick={clickHandler}>sign up</button>
    </div>
  );
}

export default App;
