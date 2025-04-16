import React from "react";

function Character({
  name,
  life,
  atk,
  mag,
  def,
  atk_temp,
  mag_temp,
  def_temp,
  ap,
}) {
  return (
    <div className="character-container">
      <div className="character-attributs-container">
        <div className="character-attributs ca-atk">
          <div className="character-attribut">Atk</div>
          <div className="character-attribut">{atk_temp}</div>
        </div>

        <div className="character-attributs ca-mag">
          <div className="character-attribut">Mag</div>
          <div className="character-attribut">{mag_temp}</div>
        </div>

        <div className="character-attributs ca-def">
          <div className="character-attribut">Def</div>
          <div className="character-attribut">{def_temp}</div>
        </div>
      </div>

      <div className="character-stats">
        <div>Name: {name}</div>
        <div>Life: {life}</div>
        <div>Atk: {atk}</div>
        <div>Mag: {mag}</div>
        <div>Def: {def}</div>
      </div>
      <div className="character-action-points">
        <div>AP: {ap}</div>
      </div>
    </div>
  );
}

export default Character;
