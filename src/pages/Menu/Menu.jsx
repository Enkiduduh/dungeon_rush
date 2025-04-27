import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  function navigateToCombatPage() {
    navigate("/selector");
  }

  function navigateToOptionsPage() {
    navigate("/options");
  }

  return (
    <div id="root-app">
      <div>
        <div className="menu-button" onClick={navigateToCombatPage}>Versus</div>

        <div className="menu-button" onClick={navigateToOptionsPage}>Options</div>
      </div>
    </div>
  );
}

export default Menu;
