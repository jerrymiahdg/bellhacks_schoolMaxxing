import { useContext } from "react";
import { LoginContext } from "../App";
import { Link } from "react-router-dom";

const NavBar = () => {
  const ctx = useContext(LoginContext);

  const logoutClickHandler = () => {
    ctx.setLoggedin(false);
    localStorage.setItem("loggedIn", false);
  };

  return (
    <div className="navbar">
      <Link to="/" className="title-link">
        <div className="title">SchoolMaxxing</div>
      </Link>
      <div className="buttons">
        {ctx.loggedIn ? (
          <>
            <Link to="share">Share</Link>
            <Link to="profile">Profile</Link>
            <Link to="/" onClick={logoutClickHandler}>
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link to="signup">Sign up</Link>
            <Link to="login">Log in</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
