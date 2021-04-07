import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function navigateToCart() {
  let response;

  group("Navigate to Cart", function () {
    response = http.get("http://ecommerce.test.k6.io/cart/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        host: "ecommerce.test.k6.io",
        "upgrade-insecure-requests": "1",
      },
    });
  });
}