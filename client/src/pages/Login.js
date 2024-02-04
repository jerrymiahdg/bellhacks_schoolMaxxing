import Input from "../components/Input";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import {useContext} from "react";
import UserContext from "../App"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const users = useContext(users).users;

  useEffect(() => {
    setValid(username.length > 0 && password.length > 0);
    console.log(valid);
  }, [username, password]);

  const onClickHandler = () => {
    console.log(username, password);
    users.forEach((user) => {
      if(user.username === username && user.password === password) {
        setValid(true);
      }
    })
  };

  return (
    <Form
      title='Welcome Back'
      subtitle='Enter your credentials to login'
      buttonText='Login'
      buttonValid={valid}
      onButtonClick={onClickHandler}
    >
      <Input placeholder='Username' setter={setUsername} />
      <Input placeholder='Password' setter={setPassword} password />
    </Form>
  );
};

export default Login;
