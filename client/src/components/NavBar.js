import { useContext } from "react";
import { LoginContext } from "../App";

const NavBar = () => {
  const ctx = useContext(LoginContext);

  return (
    <div className='navbar'>
      <div className='title'>SchoolMaxxing</div>
      <div className='buttons'>
        {ctx.loggedIn ? (
          <>
            <a href='google.com'>Share</a>
            <a href='google.com'>Profile</a>
          </>
        ) : (
          <>
            <a href='/signup'>Sign up</a>
            <a href='/login'>Log in</a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
