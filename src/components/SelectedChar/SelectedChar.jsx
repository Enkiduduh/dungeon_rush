import React from "react";
import icon_atk from "../../../public/assets/icon_atk.png";
import icon_magic from "../../../public/assets/icon_magic.png";
import icon_def from "../../../public/assets/icon_def.png";

function SelectedChar({
  char_sticker,
  char_name,
  char_atk,
  char_mag,
  char_def,
  char_resistance_img,
  char_weakness_img,
  char_life,
}) {
  return (
    <div className="selector-selected-char">
      <div className="selector-selected-char-name">{char_name}</div>
      <img src={char_sticker} alt={char_name} />
      <div className="selector-stats-line-wrapper">
        <div className="selector-stats-line">
          <img src={icon_atk} alt="" /> {char_atk}
        </div>
        <div className="selector-stats-line">
          <img src={icon_magic} alt="" /> {char_mag}
        </div>
        <div className="selector-stats-line">
          <img src={icon_def} alt="" /> {char_def}
        </div>
      </div>

      <div className="selector-stats-line line-flex">
        Resistance
        <div
          id="selector-char-resistance"
          style={{ backgroundImage: `${char_resistance_img}` }}
        ></div>
      </div>
      <div className="selector-stats-line line-flex">
        Weakness
        <div
          id="selector-char-weakness"
          style={{ backgroundImage: `${char_weakness_img}` }}
        ></div>
      </div>

      <div className="selector-stats-line line-flex">
        HP: {char_life} / {char_life}
      </div>
    </div>
  );
}

export default SelectedChar;
