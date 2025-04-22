import { useState, useEffect, useMemo } from "react";
import Character from "../Character/Character";
import Cards from "../Cards/Cards";
import { cards } from "../../data/data_cards";
import { shuffle } from "../../data/data_util";
import { char_1, char_2, char_3 } from "../../data/data_chars";
function BattleScene() {
  //PLAYER
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
  // const shuffledCards = useMemo(() => shuffle(cards), [cards]);
  const [showEndPhaseButton, setShowEndPhaseButton] = useState(false); // Nouvel état
  const [battleMessage, setBattleMessage] = useState(""); // Affichage des messages de combats
  const [criticalMessage, setCriticalMessage] = useState(""); // Affichage des coups critiques
  const [isCritical, setIsCritical] = useState(false); // Affichage des coups critiques

  const [cardsPlay, setCardsPlay] = useState([]);
  const [remainingCards, setRemainingCards] = useState([]); // Initialisez également cet état
  // Loop game
  const [resetTurn, setResetTurn] = useState(false);

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

  useEffect(() => {
    //PLAYER
    setNamePlayer(char_1.name);
    // setImgPlayer(char_1.img);
    setImgPlayer(char_1.sticker);
    setAtkPlayer(char_1.atk);
    setMagPlayer(char_1.mag);
    setDefPlayer(char_1.def);
    setActionPointPlayer(char_1.ap);
    setCriticalRatePlayer(char_1.critical);

    //COM
    setNameComputer(char_2.name);
    setAtkComputer(char_2.atk);
    setMagComputer(char_2.mag);
    setDefComputer(char_2.def);
    setActionPointComputer(char_2.ap);
    setCriticalRateComputer(char_2.critical);
  }, []);

  useEffect(() => {
    // Initialisez la vie du joueur
    setLifeInitialPlayer(char_1.life);
    setLifeActualPlayer(char_1.life); // La vie actuelle commence à 100%
  }, []);

  useEffect(() => {
    // Initialisez la vie de l'ordinateur
    setLifeInitialComputer(char_2.life);
    setLifeActualComputer(char_2.life); // La vie actuelle commence à 100%
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
      console.log("Valeur extraite :", value);
      if (regexAtk.test(target)) {
        setAtkTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
      }

      if (regexMag.test(target)) {
        setMagTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
      }

      if (regexDef.test(target)) {
        setDefTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - card.cost);
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
  function calculateDmg(
    atkChar,
    atkTempChar,
    magChar,
    magTempChar,
    defChar,
    defTempChar,
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
    // const criticalRate = critical;
    const totalDamage =
      (atkChar + atkTempChar) * cRate +
      (magChar + magTempChar) * cRate -
      (defChar + defTempChar);
    setLifeActualComputer(lifeActualComputer - totalDamage);

    // Mettez à jour le message via l'état
    setBattleMessage(
      `${attacker} a infligé ${totalDamage} dégats à ${target}.`
    );
  }

  // Effacez le message après 3 secondes
  setTimeout(() => {
    setBattleMessage("");
    setCriticalMessage("");
    setIsCritical(false);
  }, 3000);

  const endPhaseBtn = () => {
    setEndPhase(true);
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
      setShowEndPhaseButton(false); // Cache le bouton après la fin de la phase
      calculateDmg(
        atkPlayer,
        atkTempPlayer,
        magPlayer,
        magTempPlayer,
        defComputer,
        defTempComputer,
        namePlayer,
        criticalRatePlayer,
        nameComputer
      );
      gameResetTurn(); // Reinitialisation du tour
      setTimeout(() => {
        setResetTurn(false);
        setValidateTurnEnd(false);
        setEndPhase(false);
        console.log("DELAI: RESET / ENDTURN > VRAI");
      }, 3000);
    }
  }, [validateTurnEnd, endPhase]); // Dépendances pour surveiller les changements

  useEffect(() => {
    if (resetTurn) {
      setAtkTempPlayer(0);
      setMagTempPlayer(0);
      setDefTempPlayer(0);
      setActionPointPlayer(char_1.ap);
      console.log("RESET DU TOUR.");
    }
  }, [resetTurn]);

  function gameResetTurn() {
    setResetTurn(true);
    console.log("FIN DU TOUR.");
  }

  return (
    <div id="battleScene-container">
      <div className="battleScene-position-line-chars">
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
        <Character
          name={nameComputer}
          life={lifeActualComputer}
          char_life={lifeComputerPercentage}
          atk={atkComputer}
          mag={magComputer}
          def={defComputer}
          atk_temp={atkTempComputer}
          mag_temp={magTempComputer}
          def_temp={defTempComputer}
          ap={actionPointComputer}
        />
      </div>
      <div className="battleScene-position-line-cards">
        {remainingCards.map((card, index) => (
          <Cards
            key={index}
            type={card.type}
            value={card.value}
            color={card.color}
            img_bg={card.img_bg}
            img_effect={card.effect_bg}
            cost={card.cost}
            title={card.title}
            hasEffect={card.effect != ""}
            img_element={card.img_element}
            displayData={(e) => displayCardsInfos(e, index, card)} // Passe l'index
            isActive={activeCardIndex === index} // Vérifie si cette carte est active
          />
        ))}
      </div>
      <div className="battleScene-message">
        {battleMessage && <p>{battleMessage}</p>}
        {criticalMessage && <p>{criticalMessage}</p>}
        {showEndPhaseButton && (
          <button onClick={endPhaseBtn}>Terminer le tour</button>
        )}
      </div>
    </div>
  );
}

export default BattleScene;
