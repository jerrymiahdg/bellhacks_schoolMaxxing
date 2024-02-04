const Input = ({ placeholder, password, setter }) => {
  return (
    <input
      className='underline-input'
      type={password ? "password" : "text"}
      placeholder={placeholder}
      onChange={(e) => setter(e.currentTarget.value)}
    />
  );
};

export default Input;
