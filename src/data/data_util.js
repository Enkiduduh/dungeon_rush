export const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};


export function setImpactOnTarget(
  shootHTML, shootOBJ, targetCenterOBJ, targetNearCenterOBJ, targetInnerOBJ, targetOuterOBJ,
  targetCenterHTML, targetNearCenterHTML, targetInnerHTML, targetOuterHTML, scoreMissShot,
  setRedShots, setYellowShots, setGreenShots, setBlueShots

) {
  // // ZONE ASSOCIATION
  // targetOuterHTML = targetNumber
  //   .querySelector(".target-outer"); // Zone bleue
  // // Dimension zone bleue
  // targetOuterOBJ = targetOuterHTML.getBoundingClientRect();

  // targetInnerHTML = targetNumber
  //   .querySelector(".target-inner"); // Zone verte
  // targetInnerOBJ = targetInnerHTML.getBoundingClientRect();

  // targetNearCenterHTML = targetNumber
  //   .querySelector(".target-near-center"); // Zone jaune
  // targetNearCenterOBJ = targetNearCenterHTML.getBoundingClientRect();

  // targetCenterHTML = targetNumber
  //   .querySelector(".target-center"); // Zone rouge
  // targetCenterOBJ = targetCenterHTML.getBoundingClientRect();

  // ASSOCIATION IMPACT SUR ZONE ROUGE
  if (
    shootOBJ.left >= targetCenterOBJ.left &&
    shootOBJ.right <= targetCenterOBJ.right &&
    shootOBJ.top >= targetCenterOBJ.top &&
    shootOBJ.bottom <= targetCenterOBJ.bottom
  ) {
    console.log("Hit detected in target : RED.");
    setRedShots(prev => prev + 1);
    // Recalculez les coordonnées relatives à t1_z_outer
    const relativeX = shootOBJ.left - targetCenterOBJ.left;
    const relativeY = shootOBJ.top - targetCenterOBJ.top;

    targetCenterHTML.appendChild(shootHTML); // Ajoute l'impact à la cible

    // Appliquez les nouvelles coordonnées
    shootHTML.style.left = `${relativeX}px`;
    shootHTML.style.top = `${relativeY}px`;
    return true; // Impact réussi
  } else if (
    // ASSOCIATION IMPACT SUR ZONE JAUNE
    shootOBJ.left >= targetNearCenterOBJ.left &&
    shootOBJ.right <= targetNearCenterOBJ.right &&
    shootOBJ.top >= targetNearCenterOBJ.top &&
    shootOBJ.bottom <= targetNearCenterOBJ.bottom
  ) {
    console.log("Hit detected in target : YELLOW.");
    setYellowShots(prev => prev + 1);

    // Recalculez les coordonnées relatives à t1_z_outer
    const relativeX = shootOBJ.left - targetNearCenterOBJ.left;
    const relativeY = shootOBJ.top - targetNearCenterOBJ.top;

    targetNearCenterHTML.appendChild(shootHTML); // Ajoute l'impact à la cible

    // Appliquez les nouvelles coordonnées
    shootHTML.style.left = `${relativeX}px`;
    shootHTML.style.top = `${relativeY}px`;
    return true; // Impact réussi
  } else if (
    // ASSOCIATION IMPACT SUR ZONE VERTE
    shootOBJ.left >= targetInnerOBJ.left &&
    shootOBJ.right <= targetInnerOBJ.right &&
    shootOBJ.top >= targetInnerOBJ.top &&
    shootOBJ.bottom <= targetInnerOBJ.bottom
  ) {
    console.log("Hit detected in target : GREEN.");
    setGreenShots(prev => prev + 1);

    // Recalculez les coordonnées relatives à t1_z_outer
    const relativeX = shootOBJ.left - targetInnerOBJ.left;
    const relativeY = shootOBJ.top - targetInnerOBJ.top;

    targetInnerHTML.appendChild(shootHTML); // Ajoute l'impact à la cible

    // Appliquez les nouvelles coordonnées
    shootHTML.style.left = `${relativeX}px`;
    shootHTML.style.top = `${relativeY}px`;
    return true; // Impact réussi
  } else if (
    // ASSOCIATION IMPACT SUR ZONE BLEUE
    shootOBJ.left >= targetOuterOBJ.left &&
    shootOBJ.right <= targetOuterOBJ.right &&
    shootOBJ.top >= targetOuterOBJ.top &&
    shootOBJ.bottom <= targetOuterOBJ.bottom
  ) {
    console.log("Hit detected in target : BLUE.");
    setBlueShots(prev => prev + 1);

    // Recalculez les coordonnées relatives à t1_z_outer
    const relativeX = shootOBJ.left - targetOuterOBJ.left;
    const relativeY = shootOBJ.top - targetOuterOBJ.top;

    targetOuterHTML.appendChild(shootHTML); // Ajoute l'impact à la cible

    // Appliquez les nouvelles coordonnées
    shootHTML.style.left = `${relativeX}px`;
    shootHTML.style.top = `${relativeY}px`;
    return true; // Impact réussi
  } else {
    return false; // Impact manqué
  }

}
