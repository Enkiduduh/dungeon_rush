import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BattleScene from "./components/BattleScene/BattleScene";
import Page_menu from "../src/pages/Menu/Menu";
import Page_combat from "../src/pages/Combat/Combat";
import Page_options from "../src/pages/Options/Options";
import Page_selector from "../src/pages/Selector/Selector";
import Page_gun_range_training from "../src/pages/GunRange/GunRange";
import Page_gun_range_scenario from "../src/pages/GunRangeScenario/GunRangeScenario";
import Page_home from "../src/pages/Home/Home";

import "./styles/App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Page_home />} />
          <Route path="/menu" element={<Page_menu />} />
          <Route
            path="/gun-range-training"
            element={<Page_gun_range_training />}
          />
          <Route path="/gun-range" element={<Page_gun_range_scenario />} />
          <Route path="/combat" element={<Page_combat />} />
          <Route path="/options" element={<Page_options />} />
          <Route path="/selector" element={<Page_selector />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
