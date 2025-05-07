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

import fire from "../../public/assets/icon_fire.png";
import water from "../../public/assets/icon_water.png";
import earth from "../../public/assets/icon_earth.png";
import light from "../../public/assets/icon_light.png";
import dark from "../../public/assets/icon_dark.png";
import steel from "../../public/assets/element_steel.png";

import poison from "../../public/assets/effect_poison.png";
import bleed from "../../public/assets/effect_bleed.png";
import stun from "../../public/assets/effect_stun.png";
import burn from "../../public/assets/effect_burn.png";
import blind from "../../public/assets/effect_blind.png";
import freeze from "../../public/assets/effect_freeze.png";
import normal from "../../public/assets/effect_normal.png";
import shield from "../../public/assets/effect_shield.png";
import wand from "../../public/assets/effect_wand.png";

export const cards = [
  { title: "Slash", type: "atk", effect_bg: `url(${stun})`, effect: "stun", element: "earth", value: 1, cost: 1, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_1})`, img_element: `url(${earth})` },
  { title: "Cut", type: "atk", effect: "",effect_bg: `url(${normal})`, element: "water", value: 2, cost: 1, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_2})`, img_element: `url(${water})` },
  { title: "Bash", type: "atk", effect: "",effect_bg: `url(${normal})`, element: "steel", value: 3, cost: 2, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_3})`, img_element: `url(${steel})` },
  { title: "Slice", type: "atk", effect_bg: `url(${bleed})`, effect: "bleed", element: "dark", value: 4, cost: 2, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_4})`, img_element: `url(${dark})` },
  { title: "Fire Slash", type: "atk", effect_bg: `url(${burn})`, effect: "burn", element: "fire", value: 5, cost: 3, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_5})`, img_element: `url(${fire})` },
  { title: "Wood Barriere", type: "def", effect: "",effect_bg: `url(${shield})`, element: "steel", value: 1, cost: 1, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_1})`, img_element: `url(${steel})` },
  { title: "Steel Wall", type: "def", effect: "",effect_bg: `url(${shield})`, element: "fire", value: 2, cost: 1, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_2})`, img_element: `url(${fire})` },
  { title: "Volcano Egid", type: "def", effect: "",effect_bg: `url(${shield})`, element: "fire", value: 3, cost: 2, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_3})`, img_element: `url(${fire})` },
  { title: "Dark Rempart", type: "def", effect: "",effect_bg: `url(${shield})`, element: "dark", value: 4, cost: 2, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_4})`, img_element: `url(${dark})` },
  { title: "Holy Protection", type: "def", effect: "",effect_bg: `url(${shield})`, element: "steel", value: 5, cost: 3, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_5})`, img_element: `url(${steel})` },
  { title: "Rock Bullet", type: "mag", effect_bg: `url(${stun})`, effect: "stun", element: "earth", value: 1, cost: 1, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_1})`, img_element: `url(${earth})` },
  { title: "Earth Spike", type: "mag", effect: "",effect_bg: `url(${wand})`, element: "earth", value: 2, cost: 1, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_2})`, img_element: `url(${earth})` },
  { title: "Energy Void", type: "mag", effect_bg: `url(${poison})`, effect: "poison", element: "dark", value: 3, cost: 2, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_3})`, img_element: `url(${dark})` },
  { title: "Luminestria", type: "mag", effect_bg: `url(${blind})`, effect: "blind", element: "light", value: 4, cost: 2, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_4})`, img_element: `url(${light})` },
  { title: "Sky Drop", type: "mag", effect_bg: `url(${freeze})`, effect: "freeze", element: "water", value: 5, cost: 3, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_5})`, img_element: `url(${water})` }
];


export const enemy_cards = [
  { title: "Bash", type: "atk", effect: "",effect_bg: `url(${normal})`, element: "steel", value: 3, cost: 2, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_3})`, img_element: `url(${steel})` },
  { title: "Fire Slash", type: "atk", effect_bg: `url(${burn})`, effect: "burn", element: "fire", value: 5, cost: 3, color: "rgba(139, 0, 0, 0.2)", img_bg: `url(${atk_5})`, img_element: `url(${fire})` },
  { title: "Holy Protection", type: "def", effect: "",effect_bg: `url(${shield})`, element: "steel", value: 5, cost: 3, color: "rgba(0, 128, 0, 0.2)", img_bg: `url(${def_5})`, img_element: `url(${steel})` },
  { title: "Rock Bullet", type: "mag", effect_bg: `url(${stun})`, effect: "stun", element: "earth", value: 1, cost: 1, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_1})`, img_element: `url(${earth})` },
  { title: "Energy Void", type: "mag", effect_bg: `url(${poison})`, effect: "poison", element: "dark", value: 3, cost: 2, color: "rgba(0, 0, 255, 0.2)", img_bg: `url(${mag_3})`, img_element: `url(${dark})` },
];
