const fs = require('fs');

module.exports = {
    handleRemoveTmp: (path) => {
        fs.unlink(path, (err) => {
            if (err) throw err;
        });
    },
};
