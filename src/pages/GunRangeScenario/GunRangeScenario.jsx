import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import audio_gunshot from "../../../public/assets/music/gun_shot.mp3";
import audio_smgshot from "../../../public/assets/music/smg_shot.wav";
import audio_reload_1 from "../../../public/assets/music/reload_1.mp3";
import audio_reload_2 from "../../../public/assets/music/reload_2.mp3";
import audio_reload_3 from "../../../public/assets/music/reload_3.mp3";
import audio_reload_4 from "../../../public/assets/music/reload_4.mp3";
import audio_gun_empty from "../../../public/assets/music/gun_empty.mp3";

import { setImpactOnTargetBf } from "../../data/data_util_battlefield";
import Targets from "../../components/Targets/Targets";
import TargetScore from "../../components/TableScore/TableScore";
import WeaponAmmo from "../../components/WeaponAmmo/WeaponAmmo";
import BattlefieldOne from "../../components/BattlefieldOne/BattlefieldOne";
import bullet_gun from "../../../public/assets/bullets/bullet_gun.png";
import bullet_rifle from "../../../public/assets/bullets/bullet_rifle.png";
import bullet_smg from "../../../public/assets/bullets/bullet_smg.png";
import rifle from "../../../public/assets/bullets/rifle.png";
import pistol from "../../../public/assets/bullets/pistol.png";
import smg from "../../../public/assets/bullets/smg.png";

import bg_screen from "/assets/background/metalbg2.jpg";

function GunRange() {
  const [choiceGun, setChoiceGun] = useState(true);
  const [choiceRifle, setChoiceRifle] = useState(false);
  const [choiceSmg, setChoiceSmg] = useState(false);
  const [munitions, setMunitions] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [actualAmmo, setActualAmmo] = useState(12);
  const [AmmoMag, setAmmoMag] = useState(12);
  const [maxAmmo, setMaxAmmo] = useState(36);
  const [hasFired, setHasFired] = useState(false);
  const [noAmmo, setNoAmmo] = useState(false);
  const [reload, setReload] = useState(false);

  const [headShot, setHeadShot] = useState(100);
  const [otherShot, setOtherShot] = useState(20);

  const [bulletImg, setBulletImg] = useState(bullet_gun);
  // INITIALISATION
  const [name, setName] = useState("");
  const [isNameChosen, setIsNameChosen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(true);
  const [startTimer, setStartTimer] = useState(false);
  const [endTimer, setEndTimer] = useState(false);

  // TIMER
  const [timer, setTimer] = useState(0);
  // VARIABLES BUTTONS
  const [isShooting, setIsShooting] = useState(false); // Rifle
  const [isScopeActive, setIsScopeActive] = useState(false);
  const [scopePos, setScopePos] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => setScopePos({ x: e.clientX, y: e.clientY });

  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);
  // STATS
  const [missShots, setMissShots] = useState(0);
  const [score, setScore] = useState(0);
  // Target 1
  const [blueShots_t1, setBlueShots_t1] = useState(0);
  const [redShots_t1, setRedShots_t1] = useState(0);
  const [soldierLifeBlue, setSoldierLifeBlue] = useState(100);
  const [initialSoldierLifeBlue, setInitialSoldierLifeBlue] = useState(100);
  // Target 2
  const [blueShots_t2, setBlueShots_t2] = useState(0);
  const [redShots_t2, setRedShots_t2] = useState(0);
  const [soldierLifeGreen, setSoldierLifeGreen] = useState(100);
  const [initialSoldierLifeGreen, setInitialSoldierLifeGreen] = useState(100);
  // Target 3
  const [blueShots_t3, setBlueShots_t3] = useState(0);
  const [redShots_t3, setRedShots_t3] = useState(0);
  const [soldierLifeWhite, setSoldierLifeWhite] = useState(100);
  const [initialSoldierLifeWhite, setInitialSoldierLifeWhite] = useState(100);

  const audioRef_gunshot = useRef(null);
  const audioRef_smgshot = useRef(null);
  const audioRef_reload_1 = useRef(null);
  const audioRef_reload_2 = useRef(null);
  const audioRef_reload_3 = useRef(null);
  const audioRef_reload_4 = useRef(null);
  const audioRef_gun_empty = useRef(null);

  const isShootingRef = useRef(false);
  const scopePosRef = useRef({ x: 0, y: 0 });

  const clickToFire = (e) => {
    const x = e.clientX; // Coordonnée X du clic
    const y = e.clientY; // Coordonnée Y du clic
    // console.log(`Shoot : X=${x}, Y=${y}`);

    if (actualAmmo > 0) {
      setHasFired(true);
      // Réinitialisez l'audio avant de le jouer
      let audio = audioRef_gunshot.current;
      if (choiceSmg) {
        audio = audioRef_smgshot.current;
      }
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

      const targetSoldierBlue = document.querySelector(".soldier-blue");
      const soldierLifeHTMLBlue = document.querySelector(`.life-soldier-blue`);
      const targetSoldierGreen = document.querySelector(".soldier-green");
      const soldierLifeHTMLGreen =
        document.querySelector(`.life-soldier-green`);
      const targetSoldierWhite = document.querySelector(".soldier-white");
      const soldierLifeHTMLWhite =
        document.querySelector(`.life-soldier-white`);

      // Dimensions pour targetSoldierBlue
      const t1_z_outer = targetSoldierBlue.querySelector(".bf-target-outer");
      const t1_z_outerRect = t1_z_outer.getBoundingClientRect();
      const t1_z_center = targetSoldierBlue.querySelector(".bf-target-center");
      const t1_z_centerRect = t1_z_center.getBoundingClientRect();

      // Dimensions pour targetSoldierGreen
      const t2_z_outer = targetSoldierGreen.querySelector(".bf-target-outer");
      const t2_z_outerRect = t2_z_outer.getBoundingClientRect();
      const t2_z_center = targetSoldierGreen.querySelector(".bf-target-center");
      const t2_z_centerRect = t2_z_center.getBoundingClientRect();

      // Dimensions pour targetSoldierWhite
      const t3_z_outer = targetSoldierWhite.querySelector(".bf-target-outer");
      const t3_z_outerRect = t3_z_outer.getBoundingClientRect();
      const t3_z_center = targetSoldierWhite.querySelector(".bf-target-center");
      const t3_z_centerRect = t3_z_center.getBoundingClientRect();

      const divSHOOTRect = divSHOOT.getBoundingClientRect();
      // Vérifiez les cibles
      const hitTargetOne = setImpactOnTargetBf(
        divSHOOT,
        divSHOOTRect,
        t1_z_centerRect,
        t1_z_outerRect,
        t1_z_center,
        t1_z_outer,
        setRedShots_t1,
        setBlueShots_t1,
        otherShot,
        headShot,
        setSoldierLifeBlue,
        soldierLifeBlue,
        initialSoldierLifeBlue,
        soldierLifeHTMLBlue
      );

      if (!hitTargetOne) {
        const hitTargetTwo = setImpactOnTargetBf(
          divSHOOT,
          divSHOOTRect,
          t2_z_centerRect,
          t2_z_outerRect,
          t2_z_center,
          t2_z_outer,
          setRedShots_t2,
          setBlueShots_t2,
          otherShot,
          headShot,
          setSoldierLifeGreen,
          soldierLifeGreen,
          initialSoldierLifeGreen,
          soldierLifeHTMLGreen
        );

        if (!hitTargetTwo) {
          const hitTargetThree = setImpactOnTargetBf(
            divSHOOT,
            divSHOOTRect,
            t3_z_centerRect,
            t3_z_outerRect,
            t3_z_center,
            t3_z_outer,
            setRedShots_t3,
            setBlueShots_t3,
            otherShot,
            headShot,
            setSoldierLifeWhite,
            soldierLifeWhite,
            initialSoldierLifeWhite,
            soldierLifeHTMLWhite
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
      audioRef_gun_empty.current.play();
    }
  };
  // GESTION DU RELOAD
  const clickToReload = () => {
    // console.log("Reload Weapon");
    setReload(true);
  };

  const pressSpaceToReload = () => {
    setReload(true);
  };

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
      setActualAmmo(AmmoMag);
      setNoAmmo(false);
      setCurrentBulletIndex(0);
      setMaxAmmo((prev) => prev - AmmoMag);
      setReload(false);
    }

    if (maxAmmo == 0 && actualAmmo == 0) {
      ammoBtn.style.display = "none";
      const bulletsHolder = document.querySelector(".bullet-container");
      bulletsHolder.textContent = "NO AMMO LEFT !!!";
      bulletsHolder.classList.add("empty");
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Space") {
        pressSpaceToReload();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseDown = () => {
    isShootingRef.current = true;
    setIsShooting(true);
  };

  const handleMouseUp = () => {
    isShootingRef.current = false;
    setIsShooting(false);
  };

  useEffect(() => {
    if (hasFired && actualAmmo > 0) {
      setActualAmmo((prev) => prev - 1);
    }
    setHasFired(false);
  }, [hasFired]);

  // function calculateScore() {
  //   const redPoints = 100 * (redShots_t1 + redShots_t2 + redShots_t3);
  //   const yellowPoints =
  //     30 * (yellowShots_t1 + yellowShots_t2 + yellowShots_t3);
  //   const greenPoints = 5 * (greenShots_t1 + greenShots_t2 + greenShots_t3);
  //   const bluePoints = 1 * (blueShots_t1 + blueShots_t2 + blueShots_t3);

  //   setScore(redPoints + yellowPoints + greenPoints + bluePoints);
  // }

  // useEffect(() => {
  //   calculateScore();
  // });

  // GESTION DE L'ACTIVATION DU SCOPE
  useEffect(() => {
    const cursor = document.querySelector(".targets-container");
    if (isScopeActive) {
      const scope = document.getElementById("targets-scope");
      cursor.style.cursor = "none";

      const handleMouseMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Déplace le viseur pour suivre la souris
        scope.style.left = `${x}px`;
        scope.style.top = `${y}px`;
      };

      // Ajoute un écouteur d'événements pour le mouvement de la souris
      document.addEventListener("mousemove", handleMouseMove);

      // Nettoie l'écouteur d'événements lorsque le composant est démonté
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      cursor.style.cursor = `url("../../../public/assets/Cross.png") 32 32, crosshair`;
    }
  }, [isScopeActive]);

  const activateScope = () => {
    setIsScopeActive((prev) => !prev);
    console.log("toggle");
  };

  //GESTION DU MOUVEMENT DE LA SOURIS POUR VISER
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newScopePos = { x: e.clientX, y: e.clientY };
      scopePosRef.current = newScopePos;
      setScopePos(newScopePos); // Met à jour l'état pour le rendu si nécessaire
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GESTION DU TIR CONTINU
  useEffect(() => {
    if (choiceRifle || choiceSmg) {
      let shootingInterval;
      let interval = 0;

      if (choiceRifle) {
        interval = 130;
      } else if (choiceSmg) {
        interval = 110;
      }

      if (isShooting) {
        shootingInterval = setInterval(() => {
          if (isShootingRef.current && actualAmmo > 0) {
            clickToFire({
              clientX: scopePosRef.current.x,
              clientY: scopePosRef.current.y,
            });
          }
        }, interval); // Tirs toutes les 90ms
      }

      return () => {
        clearInterval(shootingInterval);
      };
    }
  }, [isShooting, actualAmmo]);

  // GESTION DU TIMER
  useEffect(() => {
    let timerOBJ;
    if (startTimer) {
      timerOBJ = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000); // 1sec

      // if (timer === 20) {
      //   setEndTimer(timer);
      // }

      return () => {
        clearInterval(timerOBJ);
      };
    }
  }, [timer, startTimer]);

  const weaponChoiceGun = () => {
    setChoiceGun(true);
    setChoiceRifle(false);
    setChoiceSmg(false);
  };

  const weaponChoiceRifle = () => {
    setChoiceGun(false);
    setChoiceRifle(true);
    setChoiceSmg(false);
  };

  const weaponChoiceSmg = () => {
    setChoiceGun(false);
    setChoiceRifle(false);
    setChoiceSmg(true);
  };

  useEffect(() => {
    const gunBtn = document.querySelector(".scope-button-gun");
    if (choiceGun) {
      gunBtn.style.border = "3px solid red";
      setMunitions([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      setActualAmmo(12);
      setMaxAmmo(36);
      setAmmoMag(12);
      setBulletImg(bullet_gun);
      audioRef_reload_4.current.play();
    } else {
      gunBtn.style.border = "3px solid white";
    }
  }, [choiceGun]);

  useEffect(() => {
    const rifleBtn = document.querySelector(".scope-button-rifle");
    if (choiceRifle) {
      rifleBtn.style.border = "3px solid red";
      setMunitions([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21,
        22, 23, 24,
      ]);
      setActualAmmo(24);
      setMaxAmmo(48);
      setAmmoMag(24);
      setBulletImg(bullet_rifle);
      audioRef_reload_1.current.play();
      audioRef_reload_2.current.play();
      audioRef_reload_3.current.play();
      audioRef_reload_4.current.play();
    } else {
      rifleBtn.style.border = "3px solid white";
    }
  }, [choiceRifle]);

  useEffect(() => {
    const smgBtn = document.querySelector(".scope-button-smg");
    if (choiceSmg) {
      smgBtn.style.border = "3px solid red";
      setMunitions([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21,
        22, 23, 24, 25, 26, 27, 28,
      ]);
      setActualAmmo(28);
      setMaxAmmo(56);
      setAmmoMag(28);
      setBulletImg(bullet_smg);
      audioRef_reload_1.current.play();
      audioRef_reload_2.current.play();
      audioRef_reload_3.current.play();
      audioRef_reload_4.current.play();
    } else {
      smgBtn.style.border = "3px solid white";
    }
  }, [choiceSmg]);

  // GESTION DU NOM / PSEUDO
  const setNameHTML = () => {
    setIsNameChosen(true);
  };

  useEffect(() => {
    if (isNameChosen) {
      const nameHTML = document.querySelector(".gr-input");
      console.log(nameHTML.value);
      setIsModalActive(false);

      const nameScore = document.querySelector(".char-name");
      nameScore.textContent = `${name}`;
      setStartTimer(true);
    }
  }, [isNameChosen]);

  useEffect(() => {
    if (endTimer) {
      const targetsAll = document.querySelectorAll(".target-wrapper");
      for (let i = 0; i < targetsAll.length; i++) {
        const targetContainer = document.querySelector(`.modal-score-${i + 1}`);
        targetContainer.appendChild(targetsAll[i]);
        targetsAll[i].classList.remove(`target-${i + 1}`);
      }
    }
  }, [endTimer]);

  return (
    <div id="root-app">
      <div
        id="fullscreen-shoot"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ backgroundImage: `url(${bg_screen})` }}
      >
        {!isModalActive ? null : (
          <>
            <div id="gun-range-input">
              <input
                type="text"
                className="gr-input"
                placeholder="Enter your name..."
                name="input-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <button className="gr-input-btn" onClick={setNameHTML}>
                OK
              </button>
            </div>
            <div id="gun-range-modal-shadow"></div>
          </>
        )}

        {!endTimer ? null : (
          <div id="gun-range-modal-score">
            {/* <div>{endTimer}</div> */}
            <div className="modal-score modal-score-1">
              <TargetScore shots_z1={redShots_t1} shots_z4={blueShots_t1} />
            </div>
            <div className="modal-score modal-score-2">
              <TargetScore shots_z1={redShots_t2} shots_z4={blueShots_t2} />
            </div>
            <div className="modal-score modal-score-3">
              <TargetScore shots_z1={redShots_t3} shots_z4={blueShots_t3} />
            </div>
            <div className="gun-range-final-score">
              <div>Miss: {missShots}</div>
              <div>Score: {score}</div>
            </div>
          </div>
        )}

        {/* INFOCHAR  */}
        <div className="char-container">
          <div className="char-name">Character_1</div>
          <div className="timer">
            <div>TIMER: </div>
            <div> {timer}s</div>
          </div>
          <div className="weapon-info">
            <button
              className="scope-button scope-button-gun"
              onClick={weaponChoiceGun}
            >
              <img src={pistol} alt="" className="pistol-img" />
            </button>
            <button
              className="scope-button scope-button-smg"
              onClick={weaponChoiceSmg}
            >
              <img src={smg} alt="" className="smg-img" />
            </button>
            <button
              className="scope-button scope-button-rifle"
              onClick={weaponChoiceRifle}
            >
              <img src={rifle} alt="" className="rifle-img" />
            </button>
          </div>
          <button className="scope-button" onClick={activateScope}>
            SCOPE
          </button>
        </div>
        {/* INFOCHAR  */}
        {/* WEAPON  */}
        <WeaponAmmo
          actualAmmo={actualAmmo}
          maxAmmo={maxAmmo}
          munitions={munitions}
          currentBulletIndex={currentBulletIndex}
          bulletImg={bulletImg}
        />
        {/* WEAPON  */}
        {/* RELOAD  */}
        {noAmmo && (
          <div id="button-reload" onClick={clickToReload}>
            Click here or Press Space to reload !
          </div>
        )}
        {/* RELOAD  */}
        {/* SCOPE ZONE */}

        {isScopeActive && (
          <div id="targets-scope">
            <div className="scope-zoom">+</div>
          </div>
        )}
        {/* <Targets clickToFire={clickToFire} /> */}

        <BattlefieldOne
          clickToFire={clickToFire}
          soldierLife_blue={soldierLifeBlue}
          soldierLife_green={soldierLifeGreen}
          soldierLife_white={soldierLifeWhite}
        />
        {/* SCOPE ZONE */}
      </div>
      <audio ref={audioRef_gunshot} src={audio_gunshot} />
      <audio ref={audioRef_smgshot} src={audio_smgshot} />
      <audio ref={audioRef_reload_1} src={audio_reload_1} />
      <audio ref={audioRef_reload_2} src={audio_reload_2} />
      <audio ref={audioRef_reload_3} src={audio_reload_3} />
      <audio ref={audioRef_reload_4} src={audio_reload_4} />
      <audio ref={audioRef_gun_empty} src={audio_gun_empty} />
    </div>
  );
}

export default GunRange;
