import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import audio_sound_aim_shooter from "../../../public/assets/music/aim_shooter.mp3";
import audio_sound_dungeon_rush from "../../../public/assets/music/dungeon_rush.mp3";
import audio_sound_main_theme from "../../../public/assets/music/main_theme.mp3";

function Home() {
  const navigate = useNavigate();
  const audio_main_theme = useRef(null);
  const audio_aim_shooter = useRef(null);
  const audio_dungeon_rush = useRef(null);

  const enterGameAimShooterScenario = () => {
    const audio = audio_aim_shooter.current;
    if (audio) {
      audio.play();
      setTimeout(() => {
        navigate("/gun-range");
      }, 1900);
    }
  };

  const enterGameAimShooterTraining = () => {
    const audio = audio_aim_shooter.current;
    if (audio) {
      audio.play();
      setTimeout(() => {
        navigate("/gun-range-training");
      }, 1900);
    }
  };
  const enterGameDungeonRush = () => {
    const audio = audio_dungeon_rush.current;
    if (audio) {
      audio.play();
      setTimeout(() => {
        navigate("/menu");
      }, 1900);
    }
  };

  useEffect(() => {
    const audio = audio_main_theme.current;
    if (audio) {
      audio.play();
      audio.volume = 0.5;
    }
  })

  return (
    <div id="home-container">
      <div id="home-choose-game">Choose a game to play</div>
      <div className="home-buttons">
        <div className="home-button" id="dr_bg" onClick={enterGameDungeonRush}>
          DUNGEON RUSH
        </div>
      </div>
      <div className="home-buttons">
        <div
          className="home-button"
          id="as_bg"
          onClick={enterGameAimShooterScenario}
        >
          AIM SHOOTER SCENARIO
        </div>
      </div>
      <div className="home-buttons">
        <div
          className="home-button"
          id="ast_bg"
          onClick={enterGameAimShooterTraining}
        >
          AIM SHOOTER TRAINING
        </div>
      </div>
      <audio ref={audio_aim_shooter} src={audio_sound_aim_shooter}></audio>
      <audio ref={audio_dungeon_rush} src={audio_sound_dungeon_rush}></audio>
      <audio ref={audio_main_theme} src={audio_sound_main_theme}></audio>
    </div>
  );
}

export default Home;
