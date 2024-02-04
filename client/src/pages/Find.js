import Button from "../components/Button";
import SchoolButton from "../components/SchoolButton";
import { useState } from "react";

const dummySchools = [
  "Milpitas High School",
  "Bellarmine College Preparatory",
  "Irvington High School",
];

const Find = () => {
  const [selectedSchool, setSelectedSchool] = useState("");

  const onSelectHandler = (e) => {
    setSelectedSchool(e.target.innerText);
  };

  return (
    <div className='app'>
      <h1>Find your school</h1>
      <div className='wrapper'>
        <div className='card grey'>Name of your school</div>
        <div className='card center'>
          <div className='finder-wrapper'>
            {dummySchools.map((school) => (
              <SchoolButton
                selected={selectedSchool == school}
                onClick={onSelectHandler}
                school={school}
              />
            ))}
          </div>
        </div>
        <Button valid={selectedSchool}>Select</Button>
        <a href='/find/add'>
          Can't find your school? <b>Add it</b>
        </a>
      </div>
    </div>
  );
};

export default Find;
