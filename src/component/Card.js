import React, { useState } from "react";
import "../card.css";

export const Card = ({ card, handleChoice, flippedCard, disable }) => {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    if (!disable) {
      handleChoice(card);
      setRotate(!rotate);
    }
  };

  return (
    <div className=" bg-white relative cursor-pointer hover:shadow-lg hover:scale-105 duration-150 w-[128px] h-[256px] p-4 flex items-center rounded-md">
      <div
        className={`${
          flippedCard ? "rotate" : ""
        } card absolute w-full h-full left-0 flex items-center `}
      >
        <img
          src={card.src}
          className="w-fit back absolute flex items-center h-[50%]"
          alt=""
        />
        <img
          onClick={handleClick}
          src="img/back.png"
          className="w-fit front absolute flex items-center h-[50%]"
          alt="image"
        />
      </div>
    </div>
  );
};
