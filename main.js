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

export default function main() {
  navigateHomepage();
  sleep(getRandom(2, 5));
  addToCart();
  sleep(getRandom(2, 5));
  navigateToCart();
  sleep(getRandom(2, 5));
  navigateToCheckout();
  sleep(getRandom(2, 5));
  updateAddress();
  sleep(getRandom(2, 5));
  submitCheckout();
  sleep(getRandom(2, 5));
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}