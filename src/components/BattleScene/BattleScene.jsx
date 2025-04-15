import { useState, useEffect, useMemo } from "react";
import Character from "../Character/Character";
import Cards from "../Cards/Cards";
import { cards } from "../../data/data_cards";
import { shuffle } from "../../data/data_util";
import { char_1, char_2, char_3 } from "../../data/data_chars";
function BattleScene() {
  //PLAYER
  const [namePlayer, setNamePlayer] = useState("");
  const [lifePlayer, setLifePlayer] = useState(0);
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
  const [lifeComputer, setLifeComputer] = useState(0);
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
  const shuffledCards = useMemo(() => shuffle(cards), [cards]);
  const [showEndPhaseButton, setShowEndPhaseButton] = useState(false); // Nouvel état
  const [battleMessage, setBattleMessage] = useState(""); // Affichage des messages de combats
  const [criticalMessage, setCriticalMessage] = useState(""); // Affichage des coups critiques

  const [cardsPlay, setCardsPlay] = useState([]);
  const [remainingCards, setRemainingCards] = useState([]); // Initialisez également cet état
  // Loop game
  const [resetTurn, setResetTurn] = useState(false);

  useEffect(() => {
    if (!resetTurn) {
      console.log("DEBUT DU TOUR.")
      const cardsReady = () => {
        const initialCards = shuffledCards.slice(0, 5); // Prenez les 5 premières cartes
        setCardsPlay(initialCards);
        setRemainingCards(initialCards); // Synchronisez les cartes restantes
      };
      cardsReady();
    }
  }, [resetTurn]); // Exécutez cet effet uniquement lorsque `shuffledCards` change

  useEffect(() => {
    //PLAYER
    setNamePlayer(char_1.name);
    setLifePlayer(char_1.life);
    setAtkPlayer(char_1.atk);
    setMagPlayer(char_1.mag);
    setDefPlayer(char_1.def);
    setActionPointPlayer(char_1.ap);
    setCriticalRatePlayer(char_1.critical);
    //COM
    setNameComputer(char_2.name);
    setLifeComputer(char_2.life);
    setAtkComputer(char_2.atk);
    setMagComputer(char_2.mag);
    setDefComputer(char_2.def);
    setActionPointComputer(char_2.ap);
    setCriticalRateComputer(char_2.critical);

  }, []);

  const displayCardsInfos = (e, index) => {
    const target = e.target.textContent;
    // console.log(target);
    const regexAtk = new RegExp("atk");
    const regexDef = new RegExp("def");
    const regexMag = new RegExp("mag");

    // Expression régulière pour extraire un nombre
    const regex = /\d+/;
    const match = target.match(regex);

    if (match && actionPointPlayer > 0) {
      const value = parseInt(match[0], 10); // Convertir la chaîne en nombre
      // console.log("Valeur extraite :", value);

      if (regexAtk.test(target)) {
        setAtkTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - 1);
      }

      if (regexMag.test(target)) {
        setMagTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - 1);
      }

      if (regexDef.test(target)) {
        setDefTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - 1);
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
    // if (actionPointPlayer === 1) {
    //   setValidateTurnEnd(true);
    //   console.log("AP:",actionPointPlayer);
    // }
  };
  function calculateDmg(
    atkChar,
    atkTempChar,
    magChar,
    magTempChar,
    defChar,
    defTempChar,
    attacker,
    critical,
    target
  ) {
    const testCrit = Math.floor(Math.random())
    // const criticalRate = critical;
    const totalDamage = ((atkChar + atkTempChar) + (magChar + magTempChar)) - (defChar + defTempChar);
    setLifeComputer(lifeComputer - totalDamage);

    // Mettez à jour le message via l'état
    setBattleMessage(
      `${attacker} a infligé ${totalDamage} dégats à ${target}.`
    );

    // Effacez le message après 3 secondes
    setTimeout(() => {
      setBattleMessage("");
    }, 3000);
  }

  const endPhaseBtn = () => {
    setEndPhase(true);
  };

  useEffect(() => {
    if (actionPointPlayer === 0) {
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
        critical,
        namePlayer,
        nameComputer
      );
      gameResetTurn(); // Reinitialisation du tour
      setTimeout(() => {
        setResetTurn(false);
        setValidateTurnEnd(false);
        setEndPhase(false);
        console.log("DELAI: RESET / ENDTURN > VRAI")
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
    console.log("FIN DU TOUR.")
  }

  return (
    <div id="battleScene-container">
      <div className="battleScene-position-line-chars">
        <Character
          name={namePlayer}
          life={lifePlayer}
          atk={atkPlayer}
          mag={magPlayer}
          def={defPlayer}
          atk_temp={atkTempPlayer}
          mag_temp={magTempPlayer}
          def_temp={defTempPlayer}
          ap={actionPointPlayer}
        />
        <Character
          name={nameComputer}
          life={lifeComputer}
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
            displayData={(e) => displayCardsInfos(e, index)} // Passe l'index
            isActive={activeCardIndex === index} // Vérifie si cette carte est active
          />
        ))}
      </div>
      <div className="battleScene-message">
        {battleMessage && <p>{battleMessage}</p>}
        {/* {criticalMessage && <p>{criticalMessage}</p>} */}
        {showEndPhaseButton && (
          <button onClick={endPhaseBtn}>Terminer le tour</button>
        )}
      </div>
    </div>
  );
}

export default BattleScene;
