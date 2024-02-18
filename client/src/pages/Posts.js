import { useContext } from "react";
import { SchoolContext } from "../App";
import BannerItem from "../components/BannerItem";
import { Link } from "react-router-dom";

const Posts = () => {
  const ctx = useContext(SchoolContext);
  const urlParams = new URLSearchParams(window.location.search);
  const items = ctx.topics.filter(
    (topic) => topic.title == urlParams.get("topic")
  )[0].posts;
  return (
    <div className="center">
      <div className="school">
        <div className="school-header">
          <h2>{`${urlParams.get("topic")} Posts`}</h2>
          <h2 className="yellow">{ctx.school.school}</h2>
        </div>
        <div className="posts">
          <div className="posts-posts">
            {items.map((item) => (
              <BannerItem item={item}></BannerItem>
            ))}
            <div className="posts-bottom">
              <p>Add Post</p>
              <p className="add-post-btn">+</p>
            </div>
          </div>
          <div className="post">
            <div className="banner-title">Post</div>
            <div className="post-input-wrapper">
              <textarea className="post-input" type="textarea" />
            </div>
          </div>
        </div>
        <Link to="/school">Back</Link>
      </div>
    </div>
  );
};

export default Posts;
