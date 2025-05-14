import React from "react";
import bg_targets from "/assets/background/background_dungeon.png";
import soldier_blue from "/assets/aim_shooter_char/enemy_soldier_blue.png";
function BattlefieldOne({ clickToFire }) {
  return (
    <div
      className="targets-container"
      onClick={clickToFire}
      style={{ backgroundImage: `url(${bg_targets})` }}
    >
      <div id="targets-title">Targets</div>
      {/* OBJ 1 */}
      <div className="bf-objects objects-1">
        <div className="bf-enemy-lifecontainer">
          <div className="bf-enemy-life"></div>
        </div>
        <img
          src={soldier_blue}
          alt=""
          className="bf-target-outer bf-target-style target-enemy"
        />
        <div className="bf-obstacle"></div>
      </div>
      {/* OBJ 2 */}
      <div className="bf-objects objects-2">
        <div className="bf-enemy-lifecontainer"></div>
        <img
          src={soldier_blue}
          alt=""
          className="bf-target-outer bf-target-style target-enemy"
        />
        <div className="bf-obstacle"></div>
      </div>
    </div>
  );
}

export default BattlefieldOne;
