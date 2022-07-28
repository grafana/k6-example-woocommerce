import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function navigateHomepage() {
  group("Navigate to Homepage", function () {
    let response = http.get("http://ecommerce.test.k6.io/", {
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

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
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

    products.forEach(i => {
      console.debug(`Product ID: '${i.id}' SKU: '${i.sku}'`);
    });

    // select a random product and store in vars:
    globalThis.vars["selectedProduct"] = products[Math.floor(Math.random() * products.length)];
    console.debug(`Selected Product with ID: '${globalThis.vars["selectedProduct"].id}' and SKU: '${globalThis.vars["selectedProduct"].sku}'`);

    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments",
      {
        time: Date.now(),
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

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });
  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}