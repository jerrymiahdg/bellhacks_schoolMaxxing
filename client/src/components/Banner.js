import BannerItem from "./BannerItem";
import { SchoolContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Banner = ({ title }) => {
  const ctx = useContext(SchoolContext);
  const items = ctx.topics.filter((topic) => topic.title === title)[0].posts;

  return (
    <div className="banner">
      <div className="banner-title">
        <Link to={`/posts?topic=${title}`}>{title}</Link>
      </div>
      {items.map((item) => (
        <BannerItem item={item}></BannerItem>
      ))}
    </div>
  );
};

export default Banner;
