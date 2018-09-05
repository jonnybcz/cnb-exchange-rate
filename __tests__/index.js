const moment = require('moment');
const czechDailyCourse = require('../index');


describe('index', () => {
    it('fetch and parse', async () => {
        const czechDailyCourseStr = await czechDailyCourse.fetch();
        const czechDailyCourseObj = czechDailyCourse.parse(czechDailyCourseStr);

        expect(typeof czechDailyCourseStr).toBe('string');
        expect(czechDailyCourseStr.split('\n').length > 3).toBe(true);
        expect(typeof czechDailyCourseObj).toBe('object');
        expect(czechDailyCourseObj.date.format('YYYY-MM-DD')).toBe(moment().format('YYYY-MM-DD'));
    });
});
