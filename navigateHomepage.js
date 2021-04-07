import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function navigateHomepage() {
  let response;

  group("Navigate to Homepage", function () {
    response = http.get("http://ecommerce.test.k6.io/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        connection: "keep-alive",
        host: "ecommerce.test.k6.io",
        "upgrade-insecure-requests": "1",
      },
    });

    // extract all of the available products using their "Add to Cart" buttons
    const addToCartButtons = response
      .html()
      .find("li[class*=product]")
      .find('a:contains("Add to Cart")')
      .toArray();

    const products = addToCartButtons.map(i => {
      return {
        id: i.get(0).getAttribute("data-product_id"),
        sku: i.get(0).getAttribute("data-product_sku")
      };
    });

    if (isDebug) {
      products.forEach(i => {
        console.log(`Product ID: '${i.id}' SKU: '${i.sku}'`);
      });
    };

    // select a random product and store in vars:
    vars["selectedProduct"] = products[Math.floor(Math.random() * products.length)];

    console.log(`Selected Product with ID: '${vars["selectedProduct"].id}' and SKU: '${vars["selectedProduct"].sku}'`);

    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments",
      {
        time: "1613672513223",
      },
      {
        headers: {
          accept: "*/*",
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

