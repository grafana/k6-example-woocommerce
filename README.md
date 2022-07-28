# k6 eCommerce Demo Scripts

## Introduction

This repo contains some example k6 scripts interacting with a basic WooCommerce website hosted at http://ecommerce.test.k6.io.

The scripts have been modularized so that each distinct "user action" manifests as its own source file, intended to be used from the entry script, in this case `main.js`. Doing so promotes code reuse and maintainability, as well as catering for some degree of flexibility over the order in which the scripts should run. Obviously, products need to have been added to the cart before checkout can be completed successfully, so there is some sequence that needs to be maintained for them to work as expected.

## Usage

Please note that the server hosting the site is not scaled for heavy loads; the scripts are being provided as working examples. Only run them if you want to see what kind of feedback k6 provides when they are run as part of a test.

1. Install [k6](https://k6.io) (instructions [here](https://k6.io/docs/getting-started/installation/))
2. Clone the repo
3. Navigate to the directory and `k6 run main.js` (make sure k6 is on your PATH)

## Contents

The scripts, and their suggested order, are as follows:

`main.js`

The entry script, where k6 `options` would be set, and the script called as part of `k6 run` (see Usage below). Its `export default function` determines what the VUs will run.

`utils.js`

This utility script contains a single exported function `checkStatus` that can be used to verify HTTP status codes. Should the received status code be different from the expected one, a couple of booleans determine whether to print the `Response.body` (if available) and whether to `fail` (skip) the rest of the iteration.

`navigateHomepage.js`

Naturally the first script to be executed. As the homepage also lists the available products on the site, it is also where these are extracted from the response, with a product selected at random and stored in `globalThis.vars["selectedProduct"]`.

`addToCart.js`

Uses (and depends on) the randomly-selected product extracted in `navigateHomepage.js`. An enhancement here might be to make all products available to it (perhaps as input data via the function parameters), such that mutiple products can be added instead of just a single one.

`navigateToCart.js`

The equivalent of the user clicking "View Cart".

`navigateToCheckout.js`

Aside from proceeding to checkout, there are also two dynamic values that need to be extracted from the response and used in the subsequent checkout itself.

`updateAddress.js`

This script represents an AJAX call that takes place when the user enters their address prior to checkout.

`submitCheckout.js`

The final checkout of the cart. A `result: "success"` JSON value is expected in the response, and so a `check` ensures that is the case. The JSON is also expected to contain a `redirectUrl` that takes the user to the confirmation page.
