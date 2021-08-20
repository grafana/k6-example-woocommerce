import { group } from "k6";
import http from "k6/http";

import { checkStatus } from "./utils.js";

export function addToCart() {
  group("Add to Cart", function () {
    let response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=add_to_cart",
      {
        product_sku: vars["selectedProduct"].sku,
        product_id: vars["selectedProduct"].id,
        quantity: "1",
      },
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: "ecommerce.test.k6.io",
          origin: "http://ecommerce.test.k6.io",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      printOnError: true,
      failOnError: true
    });
  });
}