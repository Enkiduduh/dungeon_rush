import { useState, useEffect } from "react";
import {
  char_1,
  char_2,
  char_3,
  char_4,
  char_5,
  char_6,
} from "../../data/data_chars";
import Selected_char from "../../components/SelectedChar/SelectedChar";

function Selector() {
  const characters_hero = [char_1, char_3, char_4];
  const [chars, setChars] = useState(characters_hero);
  const [selectedChar, setSelectedChar] = useState(null);
  const characters_enemy = [char_2, char_5, char_6];
  const [enemies, setEnemies] = useState(characters_enemy);
  const [selectedCharFoe, setSelectedCharFoe] = useState(null);
  const selectedPortraitHero = (e) => {
    const target = e.target.alt;
    console.log(target);
    setSelectedChar(characters_hero.find((char) => char.name == target));
    console.log(selectedChar);
  };

  const selectedPortraitEnemy = (e) => {
    const target = e.target.alt;
    console.log(target);
    setSelectedCharFoe(characters_enemy.find((char) => char.name == target));
    console.log(selectedCharFoe);
  };

  useEffect(() => {});

  return (
    <div id="selector-container">
      <div id="selector-flex">
        <div className="selector-chars-container">
          {chars.map((char, index) => (
            <div className="selector-char-wrapper" key={index}>
              <img
                src={char.avatar}
                alt={char.name}
                onClick={selectedPortraitHero}
              />
              <div className="selector-char-name">{char.name}</div>
            </div>
          ))}
        </div>
        <div className="selector-chars-container">
          {enemies.map((char, index) => (
            <div className="selector-char-wrapper" key={index}>
              <img
                src={char.avatar}
                alt={char.name}
                onClick={selectedPortraitEnemy}
              />
              <div className="selector-char-name">{char.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="selector-choice-text">
        <div>Select a hero</div>
        <div>Select an enemy</div>
      </div>
      <div id="selector-selected-container">
        <div className="selector-selected-char-wrapper">
          {selectedChar && (
            <Selected_char
              char_sticker={selectedChar.sticker}
              char_name={selectedChar.name}
              char_atk={selectedChar.atk}
              char_mag={selectedChar.mag}
              char_def={selectedChar.def}
              char_resistance_img={selectedChar.resistance_img}
              char_weakness_img={selectedChar.weakness_img}
              char_life={selectedChar.life}
            />
          )}
        </div>
        <div id="selector-versus">VS</div>
        <div className="selector-selected-char-wrapper">
        {selectedCharFoe && (
            <Selected_char
              char_sticker={selectedCharFoe.sticker}
              char_name={selectedCharFoe.name}
              char_atk={selectedCharFoe.atk}
              char_mag={selectedCharFoe.mag}
              char_def={selectedCharFoe.def}
              char_resistance_img={selectedCharFoe.resistance_img}
              char_weakness_img={selectedCharFoe.weakness_img}
              char_life={selectedCharFoe.life}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Selector;
