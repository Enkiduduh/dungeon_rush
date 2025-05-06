import React from "react";
import icon_atk from "../../../public/assets/icon_atk.png";
import icon_magic from "../../../public/assets/icon_magic.png";
import icon_def from "../../../public/assets/icon_def.png";

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
  char_img,
  char_life,
  lifeMax,
}) {
  return (
    <div className="character-container">
      {/* <div className="character-attributs-container">
        <div className="character-attributs ca-atk">
          <div className="character-attribut">
            <img src={icon_atk} alt="" />
          </div>
          <div className="character-attribut">{atk_temp}</div>
        </div>

        <div className="character-attributs ca-mag">
          <div className="character-attribut">
            <img src={icon_magic} alt="" />
          </div>
          <div className="character-attribut">{mag_temp}</div>
        </div>

        <div className="character-attributs ca-def">
          <div className="character-attribut">
            <img src={icon_def} alt="" />
          </div>
          <div className="character-attribut">{def_temp}</div>
        </div>
      </div> */}
      <div className="character-stats-container">
        <div className="character-stats">
          <div id="character-name">{name}</div>
          {/* DEBUT IMG CHAR */}
          <div className="character-stats-img-container">
            <img src={char_img} alt="" className="character-stats-img" />
          </div>
          {/* FIN IMG CHAR */}
          <div className="character-stat-infos-container">
            {/* DEBUT LIFE CHAR */}
            <div className="character-life-info">
              <div className="life-info" id="actual-life">
                {life}
              </div>{" "}
              <div className="life-info" id="separator-life">
                /
              </div>{" "}
              <div className="life-info" id="initial-life">
                {lifeMax}
              </div>
            </div>
            <div className="character-life-container">
              <div
                className="character-life"
                style={{
                  width: `${char_life}%`, // Largeur dynamique en %
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
            {/* FIN LIFE CHAR */}
            <div className="character-stat-infos">
              <div className="character-stats-flex-line">
                <div className="character-stats-line">
                  <img src={icon_atk} alt="" /> {atk}
                </div>
                <div className="character-stats-line">
                  <img src={icon_magic} alt="" /> {mag}
                </div>
                <div className="character-stats-line">
                  <img src={icon_def} alt="" /> {def}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>{name}</div> */}
      </div>

      <div className="character-action-points">
        <div>AP: {ap}</div>
      </div>
    </div>
  );
}

export default Character;
