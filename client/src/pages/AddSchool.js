import { useEffect, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";

const AddSchool = () => {
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [mascot, setMascot] = useState("");

  useEffect(() => {
    setValid(name.length > 0 && location.length > 0 && mascot.length > 0);
  }, [name, location, mascot]);

  const onClickHandler = () => {
    console.log("addschool");
  };

  return (
    <Form
      title='Add School'
      subtitle='Add your school'
      buttonText='Add Schooll'
      buttonValid={valid}
      onButtonClick={onClickHandler}
    >
      <Input placeholder='School Name' setter={setName} />
      <Input placeholder='School Location' setter={setLocation} />
      <Input placeholder='School Mascot' setter={setMascot} />
    </Form>
  );
};

export default AddSchool;
