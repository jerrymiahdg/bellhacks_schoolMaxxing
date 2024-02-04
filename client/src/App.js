import "./App.css";
import NavBar from "./components/NavBar";
import Find from "./pages/Find";
import SignUp from "./pages/SignUp";
import School from "./pages/School";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

import { useState, createContext } from "react";
import AddSchool from "./pages/AddSchool";

export const LoginContext = createContext();
export const SchoolContext = createContext();
export const UserContext = createContext();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
