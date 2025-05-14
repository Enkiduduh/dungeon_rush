export function setImpactOnTargetBf(
  shootHTML, shootOBJ, targetCenterOBJ, targetOuterOBJ,
  targetCenterHTML, targetOuterHTML,
  setRedShots, setBlueShots, normalDamage, criticalDamage,
  setObjectLife, objectLife, InitialObjectLife, lifeHTML

) {

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

    // Appliquez les dégats du tir sur l'ennemi
    if (objectLife > 0) {
      const newObjectLife = objectLife - criticalDamage;
      setObjectLife(newObjectLife);
      lifeHTML.style.width = `${(newObjectLife * 100) / InitialObjectLife}%`;
    }
    console.log(`${objectLife}%`)
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

    // Appliquez les dégats du tir sur l'ennemi
    if (objectLife > 0) {
      const newObjectLife = objectLife - normalDamage;
      setObjectLife(newObjectLife);
      lifeHTML.style.width = `${(newObjectLife * 100) / InitialObjectLife}%`;
    }
    console.log(((objectLife - normalDamage) * 100) / InitialObjectLife)
    return true; // Impact réussi
  } else {
    return false; // Impact manqué
  }

}
