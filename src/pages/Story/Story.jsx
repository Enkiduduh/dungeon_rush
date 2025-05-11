import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import audio_gunshot from "../../../public/assets/music/gun_shot.mp3";
import audio_reload_1 from "../../../public/assets/music/reload_1.mp3";
import audio_reload_2 from "../../../public/assets/music/reload_2.mp3";
import audio_reload_3 from "../../../public/assets/music/reload_3.mp3";
import audio_reload_4 from "../../../public/assets/music/reload_4.mp3";
import audio_gun_empty from "../../../public/assets/music/gun_empty.mp3";

import { setImpactOnTarget } from "../../data/data_util";

function Story() {
  const [munitions, setMunitions] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [actualAmmo, setActualAmmo] = useState(12);
  const [maxAmmo, setMaxAmmo] = useState(36);
  const [hasFired, setHasFired] = useState(false);
  const [noAmmo, setNoAmmo] = useState(false);
  const [reload, setReload] = useState(false);

  // TIMER
  const [timer, setTimer] = useState(0);

  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);
  // STATS
  const [missShots, setMissShots] = useState(0);
  // Target 1
  const [blueShots_t1, setBlueShots_t1] = useState(0);
  const [greenShots_t1, setGreenShots_t1] = useState(0);
  const [yellowShots_t1, setYellowShots_t1] = useState(0);
  const [redShots_t1, setRedShots_t1] = useState(0);
  // Target 2
  const [blueShots_t2, setBlueShots_t2] = useState(0);
  const [greenShots_t2, setGreenShots_t2] = useState(0);
  const [yellowShots_t2, setYellowShots_t2] = useState(0);
  const [redShots_t2, setRedShots_t2] = useState(0);
  // Target 3
  const [blueShots_t3, setBlueShots_t3] = useState(0);
  const [greenShots_t3, setGreenShots_t3] = useState(0);
  const [yellowShots_t3, setYellowShots_t3] = useState(0);
  const [redShots_t3, setRedShots_t3] = useState(0);

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
    // console.log(`Shoot : X=${x}, Y=${y}`);

    if (actualAmmo > 0) {
      setHasFired(true);

      // Réinitialisez l'audio avant de le jouer
      const audio = audioRef_gunshot.current;
      if (audio) {
        audio.currentTime = 0; // Remet la position de lecture à 0
        audio.play(); // Joue le son
      }
      // console.log("SHOOT > true");

      // Creation de l'impact d'un tir
      let divSHOOT = document.createElement("div" + "-shoot");
      divSHOOT.classList.add("impact");
      divSHOOT.style.top = `${y - 12}px`;
      divSHOOT.style.left = `${x - 14}px`;

      // Association de l'impact avec la zone touchée
      document.getElementById("fullscreen-shoot").appendChild(divSHOOT);

      const targetOne = document.querySelector(".target-one");
      const targetTwo = document.querySelector(".target-two");
      const targetThree = document.querySelector(".target-three");

      // Dimensions pour targetOne
      const t1_z_outer = targetOne.querySelector(".target-outer");
      const t1_z_outerRect = t1_z_outer.getBoundingClientRect();
      const t1_z_inner = targetOne.querySelector(".target-inner");
      const t1_z_innerRect = t1_z_inner.getBoundingClientRect();
      const t1_z_near_center = targetOne.querySelector(".target-near-center");
      const t1_z_near_centerRect = t1_z_near_center.getBoundingClientRect();
      const t1_z_center = targetOne.querySelector(".target-center");
      const t1_z_centerRect = t1_z_center.getBoundingClientRect();

      // Dimensions pour targetTwo
      const t2_z_outer = targetTwo.querySelector(".target-outer");
      const t2_z_outerRect = t2_z_outer.getBoundingClientRect();
      const t2_z_inner = targetTwo.querySelector(".target-inner");
      const t2_z_innerRect = t2_z_inner.getBoundingClientRect();
      const t2_z_near_center = targetTwo.querySelector(".target-near-center");
      const t2_z_near_centerRect = t2_z_near_center.getBoundingClientRect();
      const t2_z_center = targetTwo.querySelector(".target-center");
      const t2_z_centerRect = t2_z_center.getBoundingClientRect();

      // Dimensions pour targetThree
      const t3_z_outer = targetThree.querySelector(".target-outer");
      const t3_z_outerRect = t3_z_outer.getBoundingClientRect();
      const t3_z_inner = targetThree.querySelector(".target-inner");
      const t3_z_innerRect = t3_z_inner.getBoundingClientRect();
      const t3_z_near_center = targetThree.querySelector(".target-near-center");
      const t3_z_near_centerRect = t3_z_near_center.getBoundingClientRect();
      const t3_z_center = targetThree.querySelector(".target-center");
      const t3_z_centerRect = t3_z_center.getBoundingClientRect();

      const divSHOOTRect = divSHOOT.getBoundingClientRect();
      // Vérifiez les cibles
      const hitTargetOne = setImpactOnTarget(
        divSHOOT,
        divSHOOTRect,
        t1_z_centerRect,
        t1_z_near_centerRect,
        t1_z_innerRect,
        t1_z_outerRect,
        t1_z_center,
        t1_z_near_center,
        t1_z_inner,
        t1_z_outer,
        setMissShots,
        setRedShots_t1,
        setYellowShots_t1,
        setBlueShots_t1,
        setGreenShots_t1
      );

      if (!hitTargetOne) {
        const hitTargetTwo = setImpactOnTarget(
          divSHOOT,
          divSHOOTRect,
          t2_z_centerRect,
          t2_z_near_centerRect,
          t2_z_innerRect,
          t2_z_outerRect,
          t2_z_center,
          t2_z_near_center,
          t2_z_inner,
          t2_z_outer,
          setMissShots,
          setRedShots_t2,
          setYellowShots_t2,
          setBlueShots_t2,
          setGreenShots_t2
        );

        if (!hitTargetTwo) {
          const hitTargetThree = setImpactOnTarget(
            divSHOOT,
            divSHOOTRect,
            t3_z_centerRect,
            t3_z_near_centerRect,
            t3_z_innerRect,
            t3_z_outerRect,
            t3_z_center,
            t3_z_near_center,
            t3_z_inner,
            t3_z_outer,
            setMissShots,
            setRedShots_t3,
            setYellowShots_t3,
            setBlueShots_t3,
            setGreenShots_t3
          );

          if (!hitTargetThree) {
            // Si aucune cible n'est touchée, incrémentez les tirs manqués
            console.log("Missed all targets.");
            setMissShots((prev) => prev + 1);
            divSHOOT.style.display = "none";
          }
        }
      }
      // Change le style de la balle actuelle
      setCurrentBulletIndex((prevIndex) => prevIndex + 1);

      if (actualAmmo == 1) {
        setNoAmmo(true);
      }
    } else {
      // console.log("No more ammo!!");
      audioRef_gun_empty.current.play();
    }
  };

  const clickToReload = () => {
    // console.log("Reload Weapon");
    setReload(true);
  };

  useEffect(() => {
    if (hasFired && actualAmmo > 0) {
      // console.log("AMMO -1");
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
                <td className="redshots">{redShots_t1}</td>
                <td className="redshots">{redShots_t2}</td>
                <td className="redshots">{redShots_t3}</td>
                <td rowSpan="4">{missShots}</td>
              </tr>
              <tr>
                <th className="target-goldenrod">Z2</th>
                <td className="yellowshots">{yellowShots_t1}</td>
                <td className="yellowshots">{yellowShots_t2}</td>
                <td className="yellowshots">{yellowShots_t3}</td>
              </tr>
              <tr>
                <th className="target-green">Z3</th>
                <td className="greenshots">{greenShots_t1}</td>
                <td className="greenshots">{greenShots_t2}</td>
                <td className="greenshots">{greenShots_t3}</td>
              </tr>
              <tr>
                <th className="target-blue">Z4</th>
                <td className="blueshots">{blueShots_t1}</td>
                <td className="blueshots">{blueShots_t2}</td>
                <td className="blueshots">{blueShots_t3}</td>
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
        <div className="targets-container" onClick={clickToFire}>
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
