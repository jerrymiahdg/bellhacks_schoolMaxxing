const SchoolButton = ({ school, selected, onClick }) => {
  return (
    <div
      className={`card school-button ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {school}
    </div>
  );
};

export default SchoolButton;
