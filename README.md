# czech-daily-course

Library can fetch czech daily course from Česká národní banka and return as object.

## example js
```javascript
const czechDailyCourse = require('czech-daily-course');


async function download() {
    try {
        const dailyCourseAsString = await czechDailyCourse.fetch();
        const dailyCourse = czechDailyCourse.parse(dailyCourseAsString);
        
        console.log(dailyCourse);
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
