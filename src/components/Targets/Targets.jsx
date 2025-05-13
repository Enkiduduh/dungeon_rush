import React from "react";
import bg_targets from "/assets/background/gun_range.jpg";

function Targets({clickToFire}) {
  return (
    <div className="targets-container" onClick={clickToFire}
    style={{ backgroundImage: `url(${bg_targets})` }}
    >
      <div id="targets-title">Targets</div>
      {/* target1 */}
      <div className="target-wrapper target-1">
        <div className="target-outer target-style">
          <div className="target-inner target-style">
            <div className="target-near-center target-style">
              <div className="target-center target-style"></div>
            </div>
          </div>
        </div>
      </div>
      {/* target2 */}
      <div className="target-wrapper target-2">
        <div className="target-outer target-style">
          <div className="target-inner target-style">
            <div className="target-near-center target-style">
              <div className="target-center target-style"></div>
            </div>
          </div>
        </div>
      </div>
      {/* target3 */}
      <div className="target-wrapper target-3">
        <div className="target-outer target-style">
          <div className="target-inner target-style">
            <div className="target-near-center target-style">
              <div className="target-center target-style"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Targets;
