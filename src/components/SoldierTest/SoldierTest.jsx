import React from "react";

function SoldierTest({ soldier_color, soldier_life, bottom, left }) {
  return (
    <div className={`bf-target-wrapper soldier-${soldier_color}`}
      style={{
          position: "absolute",
          bottom: `${bottom}px`,
          left: `${left}px`,
        }}
    >
      <div className="bf-enemy-lifecontainer">
        <div
          className={`bf-enemy-life life-soldier-${soldier_color}`}
          style={{ width: `${soldier_life}%` }}
        ></div>
      </div>
      <div className="bf-target-center-test bf-target-style-test"></div>
      <div className="bf-target-outer-test bf-target-style-test"></div>
    </div>
  );
}

export default SoldierTest;
