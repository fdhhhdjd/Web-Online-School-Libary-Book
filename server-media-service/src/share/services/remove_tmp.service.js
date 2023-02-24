const fs = require('fs');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description delete image path
     * @function handleRemoveTmp
     * @param { path }
     * @return {String}
     */
    handleRemoveTmp: (path) => {
        fs.unlink(path, (err) => {
            if (err) throw err;
        });
    },
};
