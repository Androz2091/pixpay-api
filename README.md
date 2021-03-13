# PixPay API

This is a JavaScript client for the private PixPay API. This API won't be updated as I'm not using PixPay (but it is a great app and I wanted to try to reverse engineer a Flutter mobile app). You can read **[this tutorial](https://blog.androz2091.fr/reverse-eng-pixpay/)** to learn how I reverse engineered it!

## Usage

```js
// Import the lib
const pixpay = require('pixpay-api');

// Login to get a domain and a token
const { domain, token } = await pixpay.login(`+33@679426321`, '123456');

// Fetch the user data
const userData = await pixpay.fetchUser(domain, token).then(console.log);

// Fetch the user balance
const userBalance = await pixpay.fetchBalance(domain, token).then(console.log);
```
