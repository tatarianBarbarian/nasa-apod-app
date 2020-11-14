const fs = require('fs');
const path = require('path');

fs.rmdir(path.resolve(__dirname, '../dist'),{recursive: true} , (err) => {
    if (err) {
        throw new Error(err);
    }
});
