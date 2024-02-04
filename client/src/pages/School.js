import { useContext } from "react";
import { SchoolContext } from "../App";
import Banner from "../components/Banner";

const School = () => {
  const ctx = useContext(SchoolContext);

  return (
    <div className='center'>
      <div className='school'>
        <div className='school-header'>
          <h2>Good afternoon, {ctx.school.mascot}!</h2>
          <h2 className='yellow'>{ctx.school.school}</h2>
        </div>
        <div className='banners'>
          <div className='banners-wrapper'>
            <Banner title='Whats Happening' />
            <Banner title='Community Service' />
          </div>
          <div className='banners-wrapper'>
            <Banner title='Clubs' />
            <Banner title='Sports' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default School;
