import { useState, useEffect, useMemo } from "react";
import Character from "../Character/Character";
import Cards from "../Cards/Cards";
import { cards } from "../../data/data_cards";
import { shuffle } from "../../data/data_util";
import { char_1, char_2, char_3 } from "../../data/data_chars";
function BattleScene() {
  //PLAYER
  const [lifePlayer, setLifePlayer] = useState(0);
  const [atkPlayer, setAtkPlayer] = useState(0);
  const [defPlayer, setDefPlayer] = useState(0);
  const [atkTempPlayer, setAtkTempPlayer] = useState(0);
  const [defTempPlayer, setDefTempPlayer] = useState(0);
  const [actionPointPlayer, setActionPointPlayer] = useState(3);
  //COMPUTER
  const [lifeComputer, setLifeComputer] = useState(0);
  const [atkComputer, setAtkComputer] = useState(0);
  const [defComputer, setDefComputer] = useState(0);
  const [atkTempComputer, setAtkTempComputer] = useState(0);
  const [defTempComputer, setDefTempComputer] = useState(0);
  const [actionPointComputer, setActionPointComputer] = useState(0);
  //Variables
  const [isActive, setIsActive] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null); // Nouvel état
  const [validateTurnEnd, setValidateTurnEnd] = useState(false);
  const [endPhase, setEndPhase] = useState(false);
  const shuffledCards = useMemo(() => shuffle(cards), [cards]);
  const [showEndPhaseButton, setShowEndPhaseButton] = useState(false); // Nouvel état

  const [cardsPlay, setCardsPlay] = useState([]);
  const [remainingCards, setRemainingCards] = useState([]); // Initialisez également cet état

  useEffect(() => {
    const cardsReady = () => {
      const initialCards = shuffledCards.slice(0, 5); // Prenez les 5 premières cartes
      setCardsPlay(initialCards);
      setRemainingCards(initialCards); // Synchronisez les cartes restantes
    };
    cardsReady();
  }, [shuffledCards]); // Exécutez cet effet uniquement lorsque `shuffledCards` change

  useEffect(() => {
    //PLAYER
    setLifePlayer(char_1.life);
    setAtkPlayer(char_1.atk);
    setDefPlayer(char_1.def);
    setActionPointPlayer(char_1.ap);

    //COM
    setLifeComputer(char_2.life);
    setAtkComputer(char_2.atk);
    setDefComputer(char_2.def);
    setActionPointComputer(char_2.ap);
  }, []);

  const displayCardsInfos = (e, index) => {
    const target = e.target.textContent;
    console.log(target);
    const regexAtk = new RegExp("atk");
    const regexDef = new RegExp("def");

    // Expression régulière pour extraire un nombre
    const regex = /\d+/;
    const match = target.match(regex);

    if (match && actionPointPlayer > 0) {
      const value = parseInt(match[0], 10); // Convertir la chaîne en nombre
      console.log("Valeur extraite :", value);

      if (regexAtk.test(target)) {
        setAtkTempPlayer((prev) => prev + value);
        setActionPointPlayer((prev) => prev - 1);
        console.log(actionPointPlayer);
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
    if (actionPointPlayer === 1) {
      setValidateTurnEnd(true);
      console.log(actionPointPlayer);
    }
  };
  const calculateDmg = () => {
    const totalDamage = atkPlayer + atkTempPlayer;
    setLifeComputer(lifeComputer - totalDamage);
  };

  const endPhaseBtn = () => {
    setEndPhase(true);
  };

  useEffect(() => {
    if (validateTurnEnd) {
      setShowEndPhaseButton(true); // Affiche le bouton lorsque le tour est validé
    }
    if (endPhase) {
      calculateDmg();
      setShowEndPhaseButton(false); // Cache le bouton après la fin de la phase
    }
  }, [validateTurnEnd, endPhase]); // Dépendances pour surveiller les changements

  return (
    <div id="battleScene-container">
      <div className="battleScene-position-line-chars">
        <Character
          name={char_1.name}
          life={lifePlayer}
          atk={atkPlayer}
          def={defPlayer}
          atk_temp={atkTempPlayer}
          def_temp={defTempPlayer}
          ap={actionPointPlayer}
        />
        <Character
          name={char_2.name}
          life={lifeComputer}
          atk={atkComputer}
          def={defComputer}
          atk_temp={atkTempComputer}
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
        {showEndPhaseButton && (
          <button onClick={endPhaseBtn}>Terminer le tour</button>
        )}
      </div>
    </div>
  );
}

export default BattleScene;
