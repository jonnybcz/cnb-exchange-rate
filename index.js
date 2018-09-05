const request = require('request-promise');
const moment = require('moment');

const util = require('./util');

/**
 * @param {string} uri
 * @param {number} paramTimeout
 * @returns {Promise}
 */
async function fetch(uri = 'https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt', paramTimeout = 10000) {
    const timeout = process.env.CDC_TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : paramTimeout;
    const options = {
        uri: process.env.CDC_CNB_URL || uri,
        timeout,
    };

    return request(options);
}

/**
 * 05.09.2018 #171
 * země|měna|množství|kód|kurz
 * Austrálie|dolar|1|AUD|15,950
 * Brazílie|real|1|BRL|5,320
 * Bulharsko|lev|1|BGN|13,162
 * Čína|renminbi|1|CNY|3,256
 *
 * @param {string} str
 * @throws {error}
 * @returns {{date: Moment, currencies: Array.<{{country: string, currency: string, amount: number, code: string, rate: float}>}}
 */
function parse(str) {
    const data = {
        date: null, // moment instance
        currencies: [],
    };
    // Split rows to array.
    const rows = str.trim().split('\n');

    // Something is wrong with parsing.
    if (rows.length < 1) { throw new Error('Parsed CNB currencies error'); }

    // Is date valid?
    if (util.validateRowDate(rows[0])) {
        const extractedDate = util.extractDate(rows[0]);

        data.date = moment(extractedDate, 'DD.MM.YYYY');
    }

    // rows[0] = 05.09.2018 #171
    // rows[1] = země|měna|množství|kód|kurz
    for (let i = 2; i < rows.length; i++) {
        if (util.validateRowCurrency(rows[i])) {
            const extractedCurrency = util.extractCurrency(rows[i]);

            data.currencies.push(extractedCurrency);
        }
    }

    return data;
}


//fetch().then(parse).then(console.log).catch((x) => console.log(x.statusCode));

module.exports = {
    fetch,
    parse,
};
