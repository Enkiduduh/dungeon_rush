import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import audio_gunshot from "../../../public/assets/music/gun_shot.mp3";
import audio_reload_1 from "../../../public/assets/music/reload_1.mp3";
import audio_reload_2 from "../../../public/assets/music/reload_2.mp3";
import audio_reload_3 from "../../../public/assets/music/reload_3.mp3";
import audio_reload_4 from "../../../public/assets/music/reload_4.mp3";
import audio_gun_empty from "../../../public/assets/music/gun_empty.mp3";

function Story() {
  const [munitions, setMunitions] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [actualAmmo, setActualAmmo] = useState(12);
  const [maxAmmo, setMaxAmmo] = useState(36);
  const [hasFired, setHasFired] = useState(false);
  const [noAmmo, setNoAmmo] = useState(false);
  const [reload, setReload] = useState(false);

  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);
  // STATS
  const [missShots, setMissShots] = useState(0);

  const audioRef_gunshot = useRef(null);
  const audioRef_reload_1 = useRef(null);
  const audioRef_reload_2 = useRef(null);
  const audioRef_reload_3 = useRef(null);
  const audioRef_reload_4 = useRef(null);
  const audioRef_gun_empty = useRef(null);

  const clickToFire = (e) => {
    const target = e.target;
    const x = e.clientX; // Coordonnée X du clic
    const y = e.clientY; // Coordonnée Y du clic
    console.log(`Shoot : X=${x}, Y=${y}`);

    if (actualAmmo > 0) {
      setHasFired(true);

      // Réinitialisez l'audio avant de le jouer
      const audio = audioRef_gunshot.current;
      if (audio) {
        audio.currentTime = 0; // Remet la position de lecture à 0
        audio.play(); // Joue le son
      }
      console.log("SHOOT > true");

      // Creation de l'impact d'un tir
      let divSHOOT = document.createElement("div"+"-shoot");
      divSHOOT.classList.add("impact");
      divSHOOT.style.top = `${y - 12}px`;
      divSHOOT.style.left = `${x - 14}px`;

      // Association de l'impact avec la zone touchée
      document.getElementById("fullscreen-shoot").appendChild(divSHOOT);

      const t1_z_center = document
        .querySelector(".target-one")
        .querySelector(".target-outer");

      const divSHOOTRect = divSHOOT.getBoundingClientRect();
      const t1_z_centerRect = t1_z_center.getBoundingClientRect();

      if (
        divSHOOTRect.left >= t1_z_centerRect.left &&
        divSHOOTRect.right <= t1_z_centerRect.right &&
        divSHOOTRect.top >= t1_z_centerRect.top &&
        divSHOOTRect.bottom <= t1_z_centerRect.bottom
      ) {
        console.log("Hit detected in target.");

        // Recalculez les coordonnées relatives à t1_z_center
        const relativeX = divSHOOTRect.left - t1_z_centerRect.left;
        const relativeY = divSHOOTRect.top - t1_z_centerRect.top;

        t1_z_center.appendChild(divSHOOT); // Ajoute l'impact à la cible

        // Appliquez les nouvelles coordonnées
        divSHOOT.style.left = `${relativeX}px`;
        divSHOOT.style.top = `${relativeY}px`;

      } else {
        console.log("Missed the target center.");
        divSHOOT.style.display = "none";
        divSHOOT.classList.add("miss-shot");
        setMissShots(prev => prev + 1);
      }

      // Change le style de la balle actuelle
      setCurrentBulletIndex((prevIndex) => prevIndex + 1);

      if (actualAmmo == 1) {
        setNoAmmo(true);
      }
    } else {
      console.log("No more ammo!!");
      audioRef_gun_empty.current.play();
    }
  };

  const clickToReload = () => {
    console.log("Reload Weapon");
    setReload(true);
  };

  useEffect(() => {
    if (hasFired && actualAmmo > 0) {
      console.log("AMMO -1");
      setActualAmmo((prev) => prev - 1);
    }
    setHasFired(false);
  }, [hasFired]);

  useEffect(() => {
    const ammoBtn = document.getElementById("button-reload");
    if (noAmmo) {
      ammoBtn.style.display = "flex";
    }

    if (reload) {
      const bulletsHTML = document.querySelectorAll(".bullet");
      bulletsHTML.forEach((bullet) => {
        bullet.classList.remove("fired");
      });
      audioRef_reload_1.current.play();
      audioRef_reload_2.current.play();
      audioRef_reload_3.current.play();
      audioRef_reload_4.current.play();
      setActualAmmo(12);
      setNoAmmo(false);
      setCurrentBulletIndex(0);
      setMaxAmmo((prev) => prev - 12);
      setReload(false);
    }

    if (maxAmmo == 0 && actualAmmo == 0) {
      ammoBtn.style.display = "none";
    }
  });

  return (
    <div id="root-app">
      <div id="fullscreen-shoot">
        {/* INFOCHAR  */}
        <div className="char-container">
          <div className="char-name"> Character_1</div>
          <div className="char-info">LIFE: 30/30</div>
          <div className="weapon-info">WEAPON: Revolver</div>
        </div>
        {/* INFOCHAR  */}
        {/* SCORE  */}
        <div id="scores-container">
          {/* <div>Score</div> */}
          <table>
            <thead>
              <tr>
                <th>TARGETS</th>
                <th>Target 1</th>
                <th>Target 2</th>
                <th>Target 3</th>
                <th>Miss Shot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="target-red">Z1</th>
                <td></td>
                <td></td>
                <td></td>
                <td rowSpan="4">{missShots}</td>
              </tr>
              <tr>
                <th className="target-goldenrod">Z2</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th className="target-green">Z3</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th className="target-blue">Z4</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>

            </tbody>
          </table>
        </div>
        {/* SCORE  */}
        {/* WEAPON  */}
        <div className="weapon-container">
          <div className="weapon-ammo">
            {actualAmmo}/{maxAmmo}
          </div>
          <div className="bullet-container">
            {munitions.map((_, index) => (
              <div
                key={index}
                className={`bullet ${
                  index < currentBulletIndex ? "fired" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
        {/* WEAPON  */}
        {/* RELOAD  */}
        {noAmmo && (
          <div id="button-reload" onClick={clickToReload}>
            Reload !
          </div>
        )}
        {/* RELOAD  */}
        <div className="targets-container"  onClick={clickToFire}>
          <div id="targets-title">Targets</div>
          {/* target1 */}
          <div className="target-wrapper target-one">
            <div className="target-outer target-style">
              <div className="target-inner target-style">
                <div className="target-near-center target-style">
                  <div className="target-center target-style"></div>
                </div>
              </div>
            </div>
          </div>
          {/* target2 */}
          <div className="target-wrapper target-two">
            <div className="target-outer target-style">
              <div className="target-inner target-style">
                <div className="target-near-center target-style">
                  <div className="target-center target-style"></div>
                </div>
              </div>
            </div>
          </div>
          {/* target3 */}
          <div className="target-wrapper target-three">
            <div className="target-outer target-style">
              <div className="target-inner target-style">
                <div className="target-near-center target-style">
                  <div className="target-center target-style"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef_gunshot} src={audio_gunshot} />
      <audio ref={audioRef_reload_1} src={audio_reload_1} />
      <audio ref={audioRef_reload_2} src={audio_reload_2} />
      <audio ref={audioRef_reload_3} src={audio_reload_3} />
      <audio ref={audioRef_reload_4} src={audio_reload_4} />
      <audio ref={audioRef_gun_empty} src={audio_gun_empty} />
    </div>
  );
}

export default Story;
