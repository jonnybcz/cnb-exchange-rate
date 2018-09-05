/**
 * Validate date row
 *
 * @param {string} row ... 05.09.2018 #171
 * @returns {boolean}
 */
function validateRowDate(row) {
    return /\d{1,2}\.\d{1,2}\.\d{4}/.test(row.trim());
}

/**
 * Validate date row
 *
 * @param {string} row ... Brazílie|real|1|BRL|5,320
 * @returns {boolean}
 */
function validateRowCurrency(row) {
    return /\w+\|\w+\|\d+\|\w+\|\d+(,\d)*/.test(row.trim());
}

/**
 * Extract date from row.
 *
 * @param {string} rowWithDate ... 05.09.2018 #171
 * @throws {error}
 * @returns {string} ... 05.09.2018
 */
function extractDate(rowWithDate) {
    const dates = rowWithDate.trim().match(/(\d{1,2}\.\d{1,2}\.\d{4})/);

    if (!(dates instanceof Array)) {
        throw new Error(`Bad param ${rowWithDate} to function extractDate(param)`);
    }

    return dates[0];
}

/**
 * Extract currency from row.
 *
 * @param {string} rowWithDate ... Brazílie|real|1|BRL|5,320
 * @throws {error}
 * @returns {{country: string, currency: string, amount: number, code: string, rate: float}}
 */
function extractCurrency(rowWithDate) {
    const splittedCurrency = rowWithDate.split('|');

    if (splittedCurrency.length !== 5) {
        throw new Error(`Bad param ${rowWithDate} to function extractCurrency(param)`);
    }

    const extractedCurrency = {
        country: splittedCurrency[0].trim(),
        currency: splittedCurrency[1].trim(),
        amount: parseInt(splittedCurrency[2], 10),
        code: splittedCurrency[3].trim(),
        rate: parseFloat(splittedCurrency[4].replace(',', '.')),
    };

    return extractedCurrency;
}

module.exports = {
    validateRowCurrency,
    validateRowDate,
    extractDate,
    extractCurrency,
};
