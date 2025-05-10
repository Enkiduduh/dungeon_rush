import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
//SOUNDTRACK
import Intro_Theme from "../../../public/assets/music/intro_theme.mp3";
import Intro_Theme_alt from "../../../public/assets/music/intro_theme_alternate.mp3";
import zweihander from "../../../public/assets/zweihander.png"
import dogwild from "../../../public/assets/dogwild.png"

function Menu() {
  const navigate = useNavigate();

  function navigateToCombatPage() {
    navigate("/selector");
  }

  function navigateToOptionsPage() {
    navigate("/options");
  }

  function navigateToStoryPage() {
    navigate("/story");
  }

  // Références pour les sons
  const audioRef_Intro_theme = useRef(null);
  useEffect(() => {
    audioRef_Intro_theme.current.play();
    audioRef_Intro_theme.current.volume = 0.5;
  }, []);

  const handleAudioEnded = () => {
    const audio = audioRef_Intro_theme.current;
    if (audio) {
      audio.play(); // Redémarre la lecture
    }
  };

  return (
    <div id="root-app">
      <div id="menu-container">
        <div className="menu-flex">
          <img src={zweihander} alt="" className="menu_sword sword-left" />
          <div className="menu-title-container">
          <img src={dogwild} alt="" className="menu_dogwild dogwild" />
          <div className="menu-title">Dungeon Rush</div>
          </div>

          <div className="menu-button" onClick={navigateToStoryPage}>
            Story
          </div>

          <div className="menu-button" onClick={navigateToCombatPage}>
            Versus
          </div>

          <div className="menu-button" onClick={navigateToOptionsPage}>
            Options
          </div>
        </div>
        {/* <audio ref={audioRef_Intro_theme} src={Intro_Theme} onEnded={handleAudioEnded}/> */}
        <audio
          ref={audioRef_Intro_theme}
          src={Intro_Theme_alt}
          onEnded={handleAudioEnded}
        />
      </div>
    </div>
  );
}

export default Menu;
