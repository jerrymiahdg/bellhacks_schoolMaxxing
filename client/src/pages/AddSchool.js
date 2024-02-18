import { useEffect, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { LoginContext, UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddSchool = () => {
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [mascot, setMascot] = useState("");
  const userCtx = useContext(UserContext);
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    setValid(name.length > 0 && location.length > 0 && mascot.length > 0);
  }, [name, location, mascot]);

  const onClickHandler = () => {
    console.log("addschool");
    if (userCtx.user) {
      const school = {
        name: name,
        location: location,
        mascot: mascot,
      };
      fetch("/schools/createSchool", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(school),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) =>
        res.json().then((data) => {
          const schoolId = data.id;
          const copy = { ...userCtx.user };
          copy.school_id = schoolId;
          copy.is_admin = true;
          userCtx.setUser(copy);
          fetch("/users/createUsers", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify(userCtx.user),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) =>
            res.json().then((data) => {
              localStorage.setItem("userId", data.id);
            })
          );
          localStorage.setItem("loggedIn", true);
          loginCtx.setLoggedIn(true);
          navigate("/school");
        })
      );
    }
  };

  return (
    <Form
      title="Add School"
      subtitle="Add your school"
      buttonText="Add Schooll"
      buttonValid={valid}
      onButtonClick={onClickHandler}
    >
      <Input placeholder="School Name" setter={setName} />
      <Input placeholder="School Location" setter={setLocation} />
      <Input placeholder="School Mascot" setter={setMascot} />
    </Form>
  );
};

export default AddSchool;
