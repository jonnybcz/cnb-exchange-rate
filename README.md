# cnb-exchange-rate

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)


Library can fetch czech daily exchange rate from Česká národní banka and return as object.

## example js
```javascript
const cnbExchangeRate = require('cnb-exchange-rate');


async function download() {
    try {
        const exchangeRateAsString = await cnbExchangeRate.fetch();
        const exchangeRate = cnbExchangeRate.parse(exchangeRateAsString);

        console.log(exchangeRate);
    } catch (err) {
        if (err.statusCode !== 200) {
            console.log(`I can\`t fetch czech daily course. Server returns status code: ${err.statusCode}`);
        } else {
            console.log(`I can\`t parse czech daily course. Error: ${err}`);
        }
    }
}

download();
```
