import React from "react";

function Soldier({ soldier_img, soldier_color, soldier_life }) {
  return (
    <div className={`bf-target-wrapper soldier-${soldier_color}`}>
      <div className="bf-enemy-lifecontainer">
        <div
          className={`bf-enemy-life life-soldier-${soldier_color}`}
          style={{ width: `${soldier_life}%` }}
        ></div>
      </div>
      <img
        src={soldier_img}
        alt=""
        className={`soldier-img soldier-img-${soldier_color}`}
      />

      <div className="bf-target-center bf-target-style"></div>
      <div className="bf-target-outer bf-target-style"></div>
    </div>
  );
}

export default Soldier;
