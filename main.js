import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

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

// regex search between two strings
String.prototype.find = function (left, right) {
  const regex = new RegExp(`(?:${left})(.*?)(?:${right})`, "mg");
  const found = regex.exec(this);

  if (found && found.length > 1) {
    if (isDebug) {
      console.log(`Found token '${found[1]}' between '${left}' and '${right}'`);
    }
    return found[1];
  } else {
    return '';
  }
}