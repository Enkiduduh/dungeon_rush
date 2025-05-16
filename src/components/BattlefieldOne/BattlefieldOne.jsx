import { useState, useEffect } from "react";
import bg_targets from "/assets/background/background_dungeon.png";
import soldier_blue from "/assets/aim_shooter_char/enemy_soldier_blue.png";
import soldier_green from "/assets/aim_shooter_char/enemy_soldier_green.png";
import soldier_white from "/assets/aim_shooter_char/enemy_soldier_white.png";
import Soldier from "../Soldier/Soldier";
import SoldierTest from "../SoldierTest/SoldierTest";

function BattlefieldOne({
  clickToFire,
  soldierLife_blue,
  soldierLife_green,
  soldierLife_white,
}) {
  return (
    <div
      className="targets-container"
      onClick={clickToFire}
      style={{ backgroundImage: `url(${bg_targets})` }}
    >
      <Soldier
        soldier_img={soldier_blue}
        soldier_life={soldierLife_blue}
        soldier_color="blue"
      />

      {/* <div className="bf-obstacle obstacle1"></div> */}

      <Soldier
        soldier_img={soldier_green}
        soldier_life={soldierLife_green}
        soldier_color="green"
      />
      <div className="bf-obstacle obstacle2"></div>

      <Soldier
        soldier_img={soldier_white}
        soldier_life={soldierLife_white}
        soldier_color="white"
      />
      <div className="bf-obstacle obstacle3"></div>

      <SoldierTest
        soldier_life={soldierLife_white}
        soldier_color="beta"
      />

      <SoldierTest
        soldier_life={soldierLife_white}
        soldier_color="zeta"
      />

      <SoldierTest
        soldier_life={soldierLife_white}
        soldier_color="epyon"
      />
    </div>
  );
}

export default BattlefieldOne;
