import Button from "../components/Button";
import SchoolButton from "../components/SchoolButton";
import { useState } from "react";
import { SchoolContext } from "../App";
import { UserContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const dummySchools = [
  "Milpitas High School",
  "Bellarmine College Preparatory",
  "Irvington High School",
];

const Find = () => {
  const [selectedSchool, setSelectedSchool] = useState(false);
  const [schoolFilter, setSchoolFilter] = useState("");
  const schools = useContext(SchoolContext).schools;
  const ctx = useContext(UserContext);

  const onSelectHandler = () => {};

  const selectClickHandler = (schoolId) => {
    return () => {
      setSelectedSchool(true);
      const copy = { ...ctx.user };
      copy.school_id = schoolId;
      copy.is_admin = false;
      ctx.setUser(copy);
      fetch("/users/createUsers", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(copy),
        headers: {
          "content-type": "application/json",
        },
      });
    };
  };

  return (
    <div className="app">
      <h1>Find your school</h1>
      <div className="wrapper">
        <input
          className="card grey find-input"
          placeholder="Name of your school"
          onChange={(e) => setSchoolFilter(e.target.value)}
          value={schoolFilter}
        />
        <div className="card center">
          <div className="finder-wrapper">
            {schools
              .filter((school) =>
                school.name.toLowerCase().includes(schoolFilter.toLowerCase())
              )
              .map((school) => (
                <SchoolButton
                  selected={selectedSchool == school}
                  onClick={selectClickHandler(school.id)}
                  school={school.name}
                />
              ))}
          </div>
        </div>
        <Button valid={selectedSchool} onClick={selectClickHandler}>
          Select
        </Button>
        <Link to="/find/add">
          Can't find your school? <b>Add it</b>
        </Link>
      </div>
    </div>
  );
};

export default Find;
