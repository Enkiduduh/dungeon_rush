import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import audio_sound_aim_shooter from "../../../public/assets/music/aim_shooter.mp3";
import audio_sound_dungeon_rush from "../../../public/assets/music/dungeon_rush.mp3";

function Home() {
  const navigate = useNavigate();
  const audio_aim_shooter = useRef(null);
  const audio_dungeon_rush = useRef(null);

  const enterGameAimShooter = () => {
    const audio = audio_aim_shooter.current;
    if (audio) {
      audio.play();
      setTimeout(() => {
        navigate("/gun-range");
      }, 3000);
    }
  };
  const enterGameDungeonRush = () => {
    const audio = audio_dungeon_rush.current;
    if (audio) {
      audio.play();
      setTimeout(() => {
        navigate("/menu");
      }, 3000);
    }
  };

  return (
    <div id="home-container">
      <div id="home-choose-game">Choose a game to play</div>
      <div className="home-buttons">
        <div className="home-button" id="dr_bg" onClick={enterGameDungeonRush}>
          DUNGEON RUSH
        </div>
      </div>
      <div className="home-buttons">
        <div className="home-button" id="as_bg" onClick={enterGameAimShooter}>
          AIM SHOOTER
        </div>
      </div>
      <audio ref={audio_aim_shooter} src={audio_sound_aim_shooter}></audio>
      <audio ref={audio_dungeon_rush} src={audio_sound_dungeon_rush}></audio>
    </div>
  );
}

export default Home;
