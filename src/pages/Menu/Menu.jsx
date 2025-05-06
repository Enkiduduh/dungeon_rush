import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
//SOUNDTRACK
import Intro_Theme from "../../../public/assets/music/intro_theme.mp3";
import Intro_Theme_alt from "../../../public/assets/music/intro_theme_alternate.wav";

function Menu() {
  const navigate = useNavigate();

  function navigateToCombatPage() {
    navigate("/selector");
  }

  function navigateToOptionsPage() {
    navigate("/options");
  }

  // Références pour les sons
  const audioRef_Intro_theme_alt = useRef(null);
  useEffect(() => {
    audioRef_Intro_theme_alt.current.play();
    audioRef_Intro_theme_alt.current.volume = 0.5;
  }, []);

  const handleAudioEnded = () => {
    const audio = audioRef_Intro_theme_alt.current;
    if (audio) {
      audio.play(); // Redémarre la lecture
    }
  };

  return (
    <div id="root-app">
      <div id="menu-container">
        <div className="menu-flex">
          <div className="menu-title">Dungeon Rush</div>
          <div className="menu-button" onClick={navigateToCombatPage}>
            Versus
          </div>

          <div className="menu-button" onClick={navigateToOptionsPage}>
            Options
          </div>
        </div>
        {/* <audio ref={audioRef_Intro_theme} src={Intro_Theme} onEnded={handleAudioEnded}/> */}
        <audio
          ref={audioRef_Intro_theme_alt}
          src={Intro_Theme_alt}
          onEnded={handleAudioEnded}
        />
      </div>
    </div>
  );
}

export default Menu;
