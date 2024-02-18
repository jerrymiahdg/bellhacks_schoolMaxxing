import { useEffect, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { LoginContext } from "../App";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const setUser = useContext(UserContext).setUser;
  const navigate = useNavigate();

  useEffect(() => {
    setValid(
      firstName.length > 0 &&
        lastName.length > 0 &&
        username.length > 0 &&
        password.length > 0
    );
    console.log(valid);
  }, [firstName, lastName, username, password]);

  const onClickHandler = () => {
    const user = {
      email: username,
      firstName: firstName,
      is_admin: false,
      lastName: lastName,
      password: password,
      username: username,
    };
    setUser(user);
    navigate("/find");
  };

  return (
    <Form
      title="Sign Up"
      subtitle="Create your account"
      buttonText="Create Account"
      onButtonClick={onClickHandler}
      buttonValid={valid}
    >
      <Input placeholder="First Name" setter={setFirstName} />
      <Input placeholder="Last Name" setter={setLastName} />
      <Input placeholder="Username" setter={setUsername} />
      <Input placeholder="Password" setter={setPassword} password />
    </Form>
  );
};

export default SignUp;
