import React from "react";

function WeaponAmmo({actualAmmo,maxAmmo,munitions,currentBulletIndex,bulletImg}) {
  return (
    <div className="weapon-container">
      <div className="bullets">
        <div className="weapon-ammo">
          <div>{actualAmmo}</div>
          <div>{maxAmmo}</div>
        </div>
        <div className="bullet-container">
          {munitions.map((_, index) => (
            <div key={index} className="bullet">
              {index < currentBulletIndex ? (
                <div className="magazine-display"></div>
              ) : (
                <img src={bulletImg} alt="" className="magazine-display" />
              )}
            </div>
          ))}
        </div>
        {maxAmmo === 0 && actualAmmo === 0 ? null : actualAmmo === 0 ? (
          <div className="empty-ammo">RELOAD!</div>
        ) : null}
      </div>
    </div>
  );
}

export default WeaponAmmo;
