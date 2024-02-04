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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [topics, setTopics] = useState([
    {
      title: "Whats Happening",
      posts: [{ title: "Rally", text: "Hey fresh" }],
    },
    ,
    { title: "Clubs", posts: [] },
    { title: "Community Service", posts: [] },
    { title: "Sports", posts: [] },
  ]);
  const [user, setUser] = useState(null);
  // const [school, setSchool] = useState(null);
  const [school, setSchool] = useState({
    school: "Milpitas High School",
    mascot: "Trojan",
  });
  const [schools, setSchools] = useState([]);
  const path = window.location.pathname;

  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("/users/getUsers")
  //   .then((res) => res.json()
  //   .then((data) => {
  //     setUsers(data)
  //   }))
  //   .catch((err) => console.log(err))
  // }, [])

  // useEffect(() => {
  //   fetch("/users/getSchools")
  //   .then((res) => res.json()
  //   .then((data) => {
  //     setSchools(data)
  //   }))
  //   .catch((err) => console.log(err))
  // }, [])

  return (
    <UserContext.Provider value={{ users, setUser, user }}>
      <SchoolContext.Provider
        value={{ school, setSchool, schools, setSchools, topics, setTopics }}
      >
        <LoginContext.Provider
          value={{ loggedIn, setLoggedIn, loggingIn, setLoggedIn }}
        >
          <div className='App'>
            <NavBar />
            {(path === "/signup" || path === "/") && <SignUp />}
            {path === "/find" && <Find />}
            {path === "/find/add" && <AddSchool />}
            {path === "/school" && <School />}
            {path === "/login" && <Login />}
            {path === "/posts" && <Posts />}
          </div>
        </LoginContext.Provider>
      </SchoolContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
