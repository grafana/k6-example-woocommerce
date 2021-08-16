import { sleep } from "k6";

import { navigateHomepage } from "./navigateHomepage.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

export const options = {};

const vars = [];

const isDebug = true; // true for additonal debug

const pauseMin = 2;
const pauseMax = 5;

export default function main() {
  navigateHomepage();
  sleep(getRandom(pauseMin, pauseMax));
  addToCart();
  sleep(getRandom(pauseMin, pauseMax));
  navigateToCart();
  sleep(getRandom(pauseMin, pauseMax));
  navigateToCheckout();
  sleep(getRandom(pauseMin, pauseMax));
  updateAddress();
  sleep(getRandom(pauseMin, pauseMax));
  submitCheckout();
  sleep(getRandom(pauseMin, pauseMax));
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
