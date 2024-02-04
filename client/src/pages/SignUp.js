import { useEffect, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

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
      id: 0,
      is_admin: false,
      lastName: lastName,
      password: password,
      school_id: 0,
      username: username
    }

    window.location.href = "/find"
    
    fetch("/users/createUsers", {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    })
  };

  return (
    <Form
      title='Sign Up'
      subtitle='Create your account'
      buttonText='Create Account'
      onButtonClick={onClickHandler}
      buttonValid={valid}
    >
      <Input placeholder='First Name' setter={setFirstName} />
      <Input placeholder='Last Name' setter={setLastName} />
      <Input placeholder='Username' setter={setUsername} password />
      <Input placeholder='Password' setter={setPassword} />
    </Form>
  );
};

export default SignUp;
