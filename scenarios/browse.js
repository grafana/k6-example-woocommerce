import { navigateHomepage } from "../scripts/navigateHomepage.js";
import { addToCart } from "../scripts/addToCart.js";
import { navigateToCart } from "../scripts/navigateToCart.js";

export function browse() {
  navigateHomepage();
  addToCart();
  navigateToCart();
}