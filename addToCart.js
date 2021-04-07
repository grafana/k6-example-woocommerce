import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function addToCart() {
  let response;

  group("Add to Cart", function () {
    response = http.post(
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
  });
}