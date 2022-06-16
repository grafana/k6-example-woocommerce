import { navigateHomepage } from "../scripts/navigateHomepage.js";
import { addToCart } from "../scripts/addToCart.js";
import { navigateToCart } from "../scripts/navigateToCart.js";
import { navigateToCheckout } from "../scripts/navigateToCheckout.js";
import { updateAddress } from "../scripts/updateAddress.js";
import { submitCheckout } from "../scripts/submitCheckout.js";

export function checkout() {
  navigateHomepage();
  addToCart();
  navigateToCart();
  navigateToCheckout();
  updateAddress();
  submitCheckout();
}