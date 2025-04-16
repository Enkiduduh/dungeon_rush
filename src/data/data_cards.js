import atk_1 from "../../public/assets/atk_1.png";
import atk_2 from "../../public/assets/atk_2.png";
import atk_3 from "../../public/assets/atk_3.png";
import atk_4 from "../../public/assets/atk_4.png";
import atk_5 from "../../public/assets/atk_5.png";
import def_1 from "../../public/assets/def_1.png";
import def_2 from "../../public/assets/def_2.png";
import def_3 from "../../public/assets/def_3.png";
import def_4 from "../../public/assets/def_4.png";
import def_5 from "../../public/assets/def_5.png";
import mag_1 from "../../public/assets/mag_1.png";
import mag_2 from "../../public/assets/mag_2.png";
import mag_3 from "../../public/assets/mag_3.png";
import mag_4 from "../../public/assets/mag_4.png";
import mag_5 from "../../public/assets/mag_5.png";

// import fire from "../../public/assets/element_fire.png";
// import water from "../../public/assets/element_water.png";
// import earth from "../../public/assets/element_earth.png";
// import light from "../../public/assets/element_light.png";
// import dark from "../../public/assets/element_dark.png";
// import steel from "../../public/assets/element_steel.png";


import fire from "../../public/assets/fire.png";
import water from "../../public/assets/water.png";
import earth from "../../public/assets/earth.png";
import light from "../../public/assets/light.png";
import dark from "../../public/assets/dark.png";
import steel from "../../public/assets/element_steel.png";


export const cards = [
  { type: "atk", element: "earth", value: 1, cost: 1, color: "rgba(220, 69, 69, 0.2)", img_bg: `url(${atk_1})`, img_element:`url(${earth})` },
  { type: "atk", element: "water", value: 2, cost: 1, color: "rgba(255, 0, 0, 0.2)", img_bg: `url(${atk_2})`, img_element:`url(${water})` },
  { type: "atk", element: "steel", value: 3, cost: 2, color: "rgba(255, 0, 0, 0.2)", img_bg: `url(${atk_3})`, img_element:`url(${steel})` },
  { type: "atk", element: "dark", value: 4, cost: 2, color: "rgba(255, 0, 0, 0.2)", img_bg: `url(${atk_4})`, img_element:`url(${dark})` },
  { type: "atk", element: "fire", value: 5, cost: 3, color: "rgba(255, 0, 0, 0.2)", img_bg: `url(${atk_5})`, img_element:`url(${fire})` },
  { type: "def", element: "steel", value: 1, cost: 1, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_1})`, img_element:`url(${steel})` },
  { type: "def", element: "fire", value: 2, cost: 1, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_2})`, img_element:`url(${fire})` },
  { type: "def", element: "fire", value: 3, cost: 2, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_3})`, img_element:`url(${fire})` },
  { type: "def", element: "dark", value: 4, cost: 2, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_4})`, img_element:`url(${dark})` },
  { type: "def", element: "steel", value: 5, cost: 3, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_5})`, img_element:`url(${steel})` },
  { type: "mag", element: "earth", value: 1, cost: 1, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_1})`, img_element:`url(${earth})` },
  { type: "mag", element: "earth", value: 2, cost: 1, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_2})`, img_element:`url(${earth})` },
  { type: "mag", element: "dark", value: 3, cost: 2, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_3})`, img_element:`url(${dark})` },
  { type: "mag", element: "light", value: 4, cost: 2, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_4})`, img_element:`url(${light})` },
  { type: "mag", element: "water", value: 5, cost: 3, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_5})`, img_element:`url(${water})` }
];
