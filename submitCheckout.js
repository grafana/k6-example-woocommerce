import { group, check, fail } from "k6";
import http, { request } from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function submitCheckout() {
  let response;

  group("Submit Checkout", function () {
    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=checkout",
      {
        billing_first_name: "k6",
        billing_last_name: "Test",
        billing_company: "",
        billing_country: "US",
        billing_address_1: "Street Address 1",
        billing_address_2: "",
        billing_city: "Frisco",
        billing_state: "CO",
        billing_postcode: "80443",
        billing_phone: "7201234567",
        billing_email: "anon@k6.io",
        order_comments: "",
        payment_method: "cod",
        "woocommerce-process-checkout-nonce": vars["checkoutToken"],
        _wp_http_referer: "/?wc-ajax=update_order_review",
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

    let result;

    try {
      result = jsonpath.query(
        response.json(),
        "$['result']"
      )[0];
    } catch (err) {
      // not JSON most likely, so print debug to console
      console.error(err);
      console.log(response.body);
    }

    check(result, {
      'checkout success': (r) => r === 'success'
    });

    vars["redirectUrl"] = jsonpath.query(
      response.json(),
      "$['redirect']"
    )[0];

    if (!vars["redirectUrl"]) {
      fail(`Checkout failed: no redirect URL in response:\n${response.body}`);
    }

    if (isDebug) {
      console.log("Checkout redirect URL: " + vars["redirectUrl"]);
    }

    response = http.get(
      // "http://ecommerce.test.k6.io/checkout/order-received/63/?key=wc_order_YIi1bD2E9kzOO",
      vars["redirectUrl"],
      {
        tags: {
          name: "http://ecommerce.test.k6.io/checkout/order-received/"
        },
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          host: "ecommerce.test.k6.io",
          "upgrade-insecure-requests": "1",
        },
      }
    );

    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments",
      {
        time: "1613672584353",
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