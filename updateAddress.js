import { sleep, group, check, fail } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function updateAddress() {
  let response;

  group("Update Address", function () {
    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=update_order_review",
      {
        security: vars["securityToken"],
        payment_method: "cod",
        country: "US",
        state: "CO",
        postcode: "",
        city: "",
        address: "",
        address_2: "",
        s_country: "US",
        s_state: "CO",
        s_postcode: "",
        s_city: "",
        s_address: "",
        s_address_2: "",
        has_full_address: "false",
        post_data:
          "billing_first_name=&billing_last_name=&billing_company=&billing_country=US&billing_address_1=&billing_address_2=&billing_city=&billing_state=CO&billing_postcode=&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + vars["checkoutToken"] + "&_wp_http_referer=%2Fcheckout%2F",
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

    response = http.post(
      "http://ecommerce.test.k6.io/?wc-ajax=update_order_review",
      {
        security: vars["securityToken"],
        payment_method: "cod",
        country: "US",
        state: "CO",
        postcode: "80443",
        city: "Frisco",
        address: "Street Address 1",
        address_2: "",
        s_country: "US",
        s_state: "CO",
        s_postcode: "80443",
        s_city: "Frisco",
        s_address: "Street Address 1",
        s_address_2: "",
        has_full_address: "true",
        post_data:
          "billing_first_name=Tom&billing_last_name=Test&billing_company=&billing_country=US&billing_address_1=Street%20Address%201&billing_address_2=&billing_city=Frisco&billing_state=CO&billing_postcode=80443&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + vars["checkoutToken"] + "&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review",
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