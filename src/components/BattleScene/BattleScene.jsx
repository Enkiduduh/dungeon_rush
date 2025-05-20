import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Character from "../Character/Character";
import Cards from "../Cards/Cards";
import { cards, enemy_cards } from "../../data/data_cards";
import { shuffle } from "../../data/data_util";
import { char_1, char_2, char_3, char_4, char_5 } from "../../data/data_chars";
import { setHero, setEnemy, setGameStart } from "../../redux/parametersSlice";
import combat_001_sound from "../../../public/assets/music/combat_1.mp3";

function BattleScene() {
  const dispatch = useDispatch();
  const cardRefs = useRef([]); // pour stocker les refs des cartes
  const playerRef = useRef(null); // la div qui englobe le perso joueur
  const enemyRef = useRef(null); // la div qui englobe le perso adverse
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [arrow, setArrow] = useState(null);
  //PLAYER ONE
  const [namePlayer, setNamePlayer] = useState("");
  const [imgPlayer, setImgPlayer] = useState();
  const [lifeInitialPlayer, setLifeInitialPlayer] = useState(0);
  const [lifeActualPlayer, setLifeActualPlayer] = useState(0);
  const [atkPlayer, setAtkPlayer] = useState(0);
  const [magPlayer, setMagPlayer] = useState(0);
  const [defPlayer, setDefPlayer] = useState(0);
  const [criticalRatePlayer, setCriticalRatePlayer] = useState(0);
  const [atkTempPlayer, setAtkTempPlayer] = useState(0);
  const [magTempPlayer, setMagTempPlayer] = useState(0);
  const [defTempPlayer, setDefTempPlayer] = useState(0);
  const [actionPointPlayer, setActionPointPlayer] = useState(3);

  //COMPUTER
  const [nameComputer, setNameComputer] = useState("");
  const [imgComputer, setImgComputer] = useState();

  const [lifeInitialComputer, setLifeInitialComputer] = useState(0);
  const [lifeActualComputer, setLifeActualComputer] = useState(0);
  const [atkComputer, setAtkComputer] = useState(0);
  const [magComputer, setMagComputer] = useState(0);
  const [defComputer, setDefComputer] = useState(0);
  const [criticalRateComputer, setCriticalRateComputer] = useState(0);
  const [atkTempComputer, setAtkTempComputer] = useState(0);
  const [magTempComputer, setMagTempComputer] = useState(0);
  const [defTempComputer, setDefTempComputer] = useState(0);
  const [actionPointComputer, setActionPointComputer] = useState(0);

  //Variables
  const [isActive, setIsActive] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null); // Nouvel état
  const [validateTurnEnd, setValidateTurnEnd] = useState(false);
  const [endPhase, setEndPhase] = useState(false);
  const [hasAnEffect, setHasAnEffect] = useState(false);
  const [attackReady, setAttackReady] = useState(false);
  const [magicReady, setMagicReady] = useState(false);
  const [showEndPhaseButton, setShowEndPhaseButton] = useState(false); // Nouvel état
  const [battleMessage, setBattleMessage] = useState(""); // Affichage des messages de combats
  const [criticalMessage, setCriticalMessage] = useState(""); // Affichage des coups critiques
  const [isCritical, setIsCritical] = useState(false); // Affichage des coups critiques

  const [turnCom, setTurnCom] = useState(false); // Tour de l'ordi
  const [randomNb, setRandomNb] = useState(0); // choix de la carte de l'ordi

  const [cardsPlay, setCardsPlay] = useState([]); // Player
  const [remainingCards, setRemainingCards] = useState([]); // Initialisez également cet état
  const [cardsEnemyPlay, setCardsEnemyPlay] = useState([]); // Com

  // Loop game
  const [resetTurn, setResetTurn] = useState(false);
  
  // Récupérer les données du store
  const hero = useSelector((state) => state.parameters.hero);
  const enemy = useSelector((state) => state.parameters.enemy);
  const gameStart = useSelector((state) => state.parameters.gameStart);

  // Références pour les sons
  const audioRef_combat_001 = useRef(null);
  useEffect(() => {
    audioRef_combat_001.current.play();
    audioRef_combat_001.current.volume = 0.1;
  }, []);

  const handleAudioEnded = () => {
    const audio = audioRef_combat_001.current;
    if (audio) {
      audio.play(); // Redémarre la lecture
    }
  };

  const generateRandomNb = () => {
    if (cardsEnemyPlay.length > 0) {
      const random = Math.floor(Math.random() * cardsEnemyPlay.length);
      setRandomNb(random);
      // console.log("New random index:", random);
    }
  };

  useEffect(() => {
    if (enemy_cards.length > 0) {
      setCardsEnemyPlay(enemy_cards);
      generateRandomNb(); // Générer un index aléatoire initial
    }
  }, [enemy_cards]);

  useEffect(() => {
    if (!resetTurn) {
      console.log("DEBUT DU TOUR.");
      const cardsReady = () => {
        const basicDeck = shuffle(cards);
        // const initialCards = shuffledCards.slice(0, 5); // Prenez les 5 premières cartes
        const initialCards = basicDeck.slice(0, 5); // Prenez les 5 premières cartes
        setCardsPlay(initialCards);
        setRemainingCards(initialCards); // Synchronisez les cartes restantes
      };
      cardsReady();
    }
  }, [resetTurn]); // Exécutez cet effet uniquement lorsque `shuffledCards` change

  // dès qu’on survole une carte ou qu’on quitte…
  // 2) And in your arrow‐computing useEffect:
  useEffect(() => {
    if (!hovered) {
      setArrow(null);
      return;
    }
    const { idx, type } = hovered;
    const cardEl = cardRefs.current[idx];
    const targetEl = type === "def" ? playerRef.current : enemyRef.current;
    const contRect = containerRef.current.getBoundingClientRect();
    const cRect = cardEl.getBoundingClientRect();
    const tRect = targetEl.getBoundingClientRect();

    // start at TOP-CENTER of card
    const x1 = cRect.left + cRect.width / 2 - contRect.left;
    const y1 = cRect.top - contRect.top;
    // end at BOTTOM-CENTER of target
    const x2 = tRect.left + tRect.width / 2 - contRect.left;
    const y2 = (tRect.top + tRect.bottom) / 2 - contRect.top;

    setArrow({ x1, y1, x2, y2 });
  }, [hovered]);

  useEffect(() => {
    //PLAYER ONE
    setNamePlayer(hero.name);
    setImgPlayer(hero.avatar);
    setAtkPlayer(hero.atk);
    setMagPlayer(hero.mag);
    setDefPlayer(hero.def);
    setActionPointPlayer(hero.ap);
    setCriticalRatePlayer(hero.critical);
    //COM
    setNameComputer(enemy.name);
    setImgComputer(enemy.avatar);

    setAtkComputer(enemy.atk);
    setMagComputer(enemy.mag);
    setDefComputer(enemy.def);
    setActionPointComputer(enemy.ap);
    setCriticalRateComputer(enemy.critical);
  }, []);

  useEffect(() => {
    // Initialisez la vie du joueur
    setLifeInitialPlayer(hero.life);
    setLifeActualPlayer(hero.life); // La vie actuelle commence à 100%
  }, []);

  useEffect(() => {
    // Initialisez la vie de l'ordinateur
    setLifeInitialComputer(enemy.life);
    setLifeActualComputer(enemy.life); // La vie actuelle commence à 100%
  }, []);

  // Calculez le pourcentage de vie restante
  const maxLifeBarWidth = 100; // La barre sera toujours affichée comme si elle était à 100%
  const lifePlayerPercentage =
    (lifeActualPlayer / lifeInitialPlayer) * maxLifeBarWidth;

  const lifeComputerPercentage =
    (lifeActualComputer / lifeInitialComputer) * maxLifeBarWidth;

  const displayCardsInfos = (e, index, card) => {
    const target = e.target.textContent;
    // console.log(target);
    const regexAtk = new RegExp("atk");
    const regexDef = new RegExp("def");
    const regexMag = new RegExp("mag");

    // Expression régulière pour extraire un nombre
    const regex = /\d+/;
    const match = target.match(regex);

    if (match && actionPointPlayer >= card.cost) {
      const value = parseInt(match[0], 10); // Convertir la chaîne en nombre
      // console.log("Valeur extraite :", value);
      if (regexAtk.test(target)) {
        setAtkTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
        setAttackReady(true);
      }

      if (regexMag.test(target)) {
        setMagTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
        setMagicReady(true);
      }

      if (regexDef.test(target)) {
        setDefTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
        setLifeActualPlayer((prev) => prev + value * defPlayer);
      }

      // Supprime la carte cliquée de la liste
      setRemainingCards((prevCards) => prevCards.filter((_, i) => i !== index));
    } else {
      const messageHTML = document.querySelector(".battleScene-message");
      messageHTML.textContent = "Vous n'avez plus de points d'action.";
      setTimeout(() => {
        messageHTML.textContent = "";
      }, 3000);
    }
  };

  useEffect(() => {
    if (attackReady) {
      calculateDmg(
        atkPlayer,
        atkTempPlayer,
        magPlayer,
        magTempPlayer,
        namePlayer,
        criticalRatePlayer,
        nameComputer
      );
      setAtkTempPlayer(0);
      setAttackReady(false);
    }

    if (magicReady) {
      calculateDmg(
        atkPlayer,
        atkTempPlayer,
        magPlayer,
        magTempPlayer,
        namePlayer,
        criticalRatePlayer,
        nameComputer
      );
      setMagTempPlayer(0);
      setMagicReady(false);
    }
  }, [attackReady, magicReady]);

  function calculateDmg(
    atkChar,
    atkTempChar,
    magChar,
    magTempChar,
    attacker,
    criticalRate,
    target
  ) {
    const testCrit = Math.floor(Math.random() * 100 + 1);
    let cRate = 1;
    console.log(testCrit);
    console.log(testCrit <= criticalRate * 100);
    console.log(testCrit, criticalRate);
    if (testCrit <= criticalRate * 100) {
      cRate = 1.5;
      setIsCritical(true);
      console.log("critical hit");
    }
    let totalDamage =
      atkTempChar * cRate * atkChar + magTempChar * cRate * magChar;
    if (target == namePlayer) {
      setLifeActualPlayer((prev) => prev - totalDamage);
    }
    if (target == nameComputer) {
      setLifeActualComputer((prev) => prev - totalDamage);
    }
    console.log(totalDamage);
    // Mettez à jour le message via l'état
    setBattleMessage(
      `${attacker} a infligé ${totalDamage} dégats à ${target}.`
    );
  }

  // function verifyAttackType(
  //   atk,
  //   mag,
  //   atkTempCharacter,
  //   critCharacter,
  //   atkCharacter,
  //   magTempCharacter,
  //   magCharacter
  // ) {
  //   if (atk > 0) {
  //     const totalDamage = atkTempCharacter * critCharacter * atkCharacter;
  //     return totalDamage;
  //   }

  //   if (mag > 0) {
  //     const totalDamage = magTempCharacter * critCharacter * magCharacter;
  //     return totalDamage;
  //   }
  // }

  useEffect(() => {
    if (battleMessage || criticalMessage) {
      const timeout = setTimeout(() => {
        setBattleMessage("");
        setCriticalMessage("");
        setIsCritical(false);
      }, 4000);

      // Nettoyez le timeout précédent si le message change avant la fin du délai
      return () => clearTimeout(timeout);
    }
  }, [battleMessage, criticalMessage]);

  const endPhaseBtn = () => {
    /////////////////// GESTION DU TOUT ORDINATEUR ////////////////////
    setShowEndPhaseButton(false); // Cache le bouton après la fin de la phase
    setTurnCom(true);
    console.log("Turn : COM");

    // Générer un nouvel index aléatoire
    generateRandomNb();

    if (cardsEnemyPlay[randomNb].type == "atk") {
      // Gestion de l'attaque physique de l'ennemi
      const atkTempCom = cardsEnemyPlay[randomNb].value;
      calculateDmg(
        atkComputer,
        atkTempCom,
        magComputer,
        magTempComputer,
        nameComputer,
        criticalRateComputer,
        namePlayer
      );
    } else if (cardsEnemyPlay[randomNb].type == "mag") {
      // Gestion de l'attaque magique de l'ennemi
      const magTempCom = cardsEnemyPlay[randomNb].value;
      calculateDmg(
        atkComputer,
        atkTempComputer,
        magComputer,
        magTempCom,
        nameComputer,
        criticalRateComputer,
        namePlayer
      );
    } else {
      // Gestion de la defense de l'ennemi
      const defTempCom = cardsEnemyPlay[randomNb].value;
      setLifeActualComputer((prev) => prev + defTempCom * defComputer);
      console.log(cardsEnemyPlay[randomNb].type);
      console.log("ENEMY should gain ARMOR:",defTempCom )
    }
    setTimeout(() => {
      setAtkTempComputer(0);
      setMagTempComputer(0);
      setDefTempComputer(0);
      setTurnCom(false);
      setEndPhase(true);
      setShowEndPhaseButton(true); // Réaffiche le bouton après la fin de la phase
    }, 3000);
  };

  useEffect(() => {
    if (isCritical) {
      setCriticalMessage(`Coup critique infligé.`);
    }
  });

  useEffect(() => {
    if (actionPointPlayer >= 0) {
      setValidateTurnEnd(true);
    }
  }, [actionPointPlayer]);

  useEffect(() => {
    if (validateTurnEnd) {
      console.log("Bouton doit apparaitre");
      setShowEndPhaseButton(true); // Affiche le bouton lorsque le tour est validé
    }
    if (endPhase) {
      console.log("Bouton doit disparaitre et calcule des dégats");
      // setShowEndPhaseButton(false); // Cache le bouton après la fin de la phase
      gameResetTurn(); // Reinitialisation du tour
      setTimeout(() => {
        setResetTurn(false);
        setValidateTurnEnd(false);
        setEndPhase(false);
        // console.log("DELAI: RESET / ENDTURN > VRAI");
      }, 2000);
    }
  }, [validateTurnEnd, endPhase]); // Dépendances pour surveiller les changements

  useEffect(() => {
    if (resetTurn) {
      setAtkTempPlayer(0);
      setMagTempPlayer(0);
      setDefTempPlayer(0);
      setActionPointPlayer(hero.ap);
      // console.log("RESET DU TOUR.");
    }
  }, [resetTurn]);

  function gameResetTurn() {
    setResetTurn(true);
    // console.log("FIN DU TOUR.");
  }

  const displayNameWhenMouseOver = (e) => {
    const target = e.target.alt;
    // console.log(target);
  };

  return (
    <div
      ref={containerRef}
      id="battleScene-container"
      style={{ position: "relative" }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="4"
            markerHeight="4"
            refX="3"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 Z" fill="#f57f18" />
          </marker>
        </defs>

        {arrow && (
          <path
            d={`
            M ${arrow.x1},${arrow.y1}
            C ${arrow.x1},${(arrow.y1 + arrow.y2) / 4}
              ${arrow.x2},${(arrow.y1 + arrow.y2) / 4}
              ${arrow.x2},${arrow.y2}
          `}
            fill="none"
            stroke="#f57f18"
            strokeWidth="6"
            markerEnd="url(#arrowhead)"
            stroke-dasharray="5,5,5"
          />
        )}
      </svg>

      <div className="battleScene-position-line-chars">
        <div id="battleScene-column-chars">
          <Character
            name={namePlayer}
            life={lifeActualPlayer}
            char_life={lifePlayerPercentage}
            lifeMax={lifeInitialPlayer}
            atk={atkPlayer}
            mag={magPlayer}
            def={defPlayer}
            atk_temp={atkTempPlayer}
            mag_temp={magTempPlayer}
            def_temp={defTempPlayer}
            ap={actionPointPlayer}
            char_img={imgPlayer}
          />
        </div>

        <div className="battleScene-message">
          {battleMessage && <p>{battleMessage}</p>}
          {criticalMessage && (
            <p className="critical-message">{criticalMessage}</p>
          )}
        </div>
        {showEndPhaseButton && (
          <button id="button-endturn" onClick={endPhaseBtn}>
            Terminer le tour
          </button>
        )}
        <div id="battleScene-stage"></div>
        <div id="battleScene-display-chars">
          {/* ↓ ta zone joueur, avec un ref pour la cible défensive ↓ */}
          <div className="battleScene-display-char-shadow">
            <img
              src={hero.img}
              alt={hero.name}
              className="battleScene-display-img"
              id="char_one"
              onMouseEnter={displayNameWhenMouseOver}
              ref={playerRef}
            />
            <div id="battleScene-stage-shadow-hero"></div>
          </div>

          {/* ↓ ta zone adversaire, avec un ref pour la cible offensive ↓ */}
          <div className="battleScene-display-char-shadow">
            <img
              src={enemy.img}
              alt={enemy.name}
              className="battleScene-display-img"
              id="char_com_one"
              onMouseEnter={displayNameWhenMouseOver}
              ref={enemyRef}
            />
            <div id="battleScene-stage-shadow-enemy"></div>
          </div>
        </div>
        <div id="battleScene-column-chars">
          <Character
            name={nameComputer}
            life={lifeActualComputer}
            char_life={lifeComputerPercentage}
            lifeMax={lifeInitialComputer}
            atk={atkComputer}
            mag={magComputer}
            def={defComputer}
            atk_temp={atkTempComputer}
            mag_temp={magTempComputer}
            def_temp={defTempComputer}
            ap={actionPointComputer}
            char_img={imgComputer}
          />
          {turnCom && (
            <div className="battleScene-column-card-choice-com-container">
              <Cards
                type={cardsEnemyPlay[randomNb].type}
                value={cardsEnemyPlay[randomNb].value}
                color={cardsEnemyPlay[randomNb].color}
                img_bg={cardsEnemyPlay[randomNb].img_bg}
                img_element={cardsEnemyPlay[randomNb].img_element}
                cost={cardsEnemyPlay[randomNb].cost}
                title={cardsEnemyPlay[randomNb].title}
                hasEffect={cardsEnemyPlay[randomNb].effect !== ""}
                img_effect={cardsEnemyPlay[randomNb].effect_bg}
              />
            </div>
          )}
        </div>
      </div>
      <div className="battleScene-position-line-cards">
        {remainingCards.map((card, index) => (
          <div
            key={index}
            className="card-wrapper"
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={() => setHovered({ idx: index, type: card.type })}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => displayCardsInfos(e, index, card)}
            style={{ display: "inline-block", margin: "0 8px" }} // ou ta propre mise en page
          >
            <Cards
              type={card.type}
              value={card.value}
              color={card.color}
              img_bg={card.img_bg}
              img_element={card.img_element}
              cost={card.cost}
              title={card.title}
              hasEffect={card.effect !== ""}
              img_effect={card.effect_bg}
              isActive={activeCardIndex === index}
            />
          </div>
        ))}
      </div>
      <audio
        ref={audioRef_combat_001}
        src={combat_001_sound}
        onEnded={handleAudioEnded}
      />
    </div>
  );
}

export default BattleScene;
