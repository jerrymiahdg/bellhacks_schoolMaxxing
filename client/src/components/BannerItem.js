import { useState } from "react";

const BannerItem = ({ item }) => {
  const [opened, setOpened] = useState(false);
  const onClickHandler = () => {
    setOpened((state) => !state);
  };

  return (
    <>
      <div className='banner-item-wrapper' key={item.text}>
        <div className='banner-item'>
          <p>
            <b>{item.title}</b>
          </p>
          <p
            className={`opener ${opened ? "open" : ""}`}
            onClick={onClickHandler}
          >
            {">"}
          </p>
          {!opened && <p>{item.text}</p>}
        </div>
        {opened && <p>{item.text}</p>}
      </div>
    </>
  );
};

export default BannerItem;
