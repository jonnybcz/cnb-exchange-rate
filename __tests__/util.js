const util = require('../util');


describe('util', () => {
    it('validate row with date', async () => {
        const validString1 = '     05.09.2018 #171';
        const validString2 = 'xxx    05.09.2018 #156 xxx';
        const nonValidString1 = '05.x09.2018 #156';

        expect(util.validateRowDate(validString1)).toBe(true);
        expect(util.validateRowDate(validString2)).toBe(true);
        expect(util.validateRowDate(nonValidString1)).toBe(false);
    });

    it('validate row with currency', async () => {
        const validString1 = '    Brazílie|real|1|BRL|5,320   ';
        const validString2 = 'Brazílie|real|1|BRL|5';
        const nonValidString1 = 'Brazílie real 1 BRL 5,320';
        const nonValidString2 = 'Brazílie;real;1;BRL;5,320';

        expect(util.validateRowCurrency(validString1)).toBe(true);
        expect(util.validateRowCurrency(validString2)).toBe(true);
        expect(util.validateRowCurrency(nonValidString1)).toBe(false);
        expect(util.validateRowCurrency(nonValidString2)).toBe(false);
    });

    it('extract date from row', async () => {
        const validString1 = '     05.09.2018 #171';
        const validString2 = 'xxx    05.09.2018 #156 xxx';

        expect(util.extractDate(validString1)).toBe('05.09.2018');
        expect(util.extractDate(validString2)).toBe('05.09.2018');
        expect(() => {util.extractDate('bad row');}).toThrow('Bad param bad row to function extractDate(param)');
    });

    it('extract currency from row', async () => {
        const validString1 = '    Brazílie|real|1|BRL|5,320   ';
        const validString2 = 'Brazílie|real|1|BRL|5';

        // ok
        expect(util.extractCurrency(validString1).country).toBe('Brazílie');
        expect(util.extractCurrency(validString1).currency).toBe('real');
        expect(util.extractCurrency(validString1).amount).toBe(1);
        expect(util.extractCurrency(validString1).code).toBe('BRL');
        expect(util.extractCurrency(validString1).rate).toBe(5.32);
        // ok
        expect(util.extractCurrency(validString2).country).toBe('Brazílie');
        expect(util.extractCurrency(validString2).currency).toBe('real');
        expect(util.extractCurrency(validString2).amount).toBe(1);
        expect(util.extractCurrency(validString2).code).toBe('BRL');
        expect(util.extractCurrency(validString2).rate).toBe(5);
        // non-ok
        expect(() => {util.extractCurrency('bad row');}).toThrow('Bad param bad row to function extractCurrency(param)');
    });
});
