import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BattleScene from "./components/BattleScene/BattleScene";
import Page_menu from "../src/pages/Menu/Menu"
import Page_combat from "../src/pages/Combat/Combat"
import Page_options from "../src/pages/Options/Options"
import Page_selector from "../src/pages/Selector/Selector"
import "./styles/App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Page_menu />} />
          <Route path="/combat" element={<Page_combat />} />
          <Route path="/combat" element={<Page_options />} />
          <Route path="/selector" element={<Page_selector />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
