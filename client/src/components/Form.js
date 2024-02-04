import Button from "./Button";

const Form = ({
  children,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonValid,
}) => {
  return (
    <div className='center'>
      <div className='card small-card'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
        <Button valid={buttonValid} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
