import { sleep } from "k6";

import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

import { navigateHomepage } from "./navigateHomepage.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

export const options = {};

const vars = [];

const isDebug = true; // true for additonal debug

const pauseMin = 1;
const pauseMax = 1;

export default function main() {
  navigateHomepage();
  sleep(randomIntBetween(pauseMin, pauseMax));

  addToCart();
  sleep(randomIntBetween(pauseMin, pauseMax));

  navigateToCart();
  sleep(randomIntBetween(pauseMin, pauseMax));

  navigateToCheckout();
  sleep(randomIntBetween(pauseMin, pauseMax));

  updateAddress();
  sleep(randomIntBetween(pauseMin, pauseMax));

  submitCheckout();
  sleep(randomIntBetween(pauseMin, pauseMax));
}