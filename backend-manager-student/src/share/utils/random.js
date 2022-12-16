const { SonyFlake } = require('sonyflake');

const SONY_FLAKE = new SonyFlake({
    machineId: 2, // in range 2^16
    epoch: Date.UTC(2020, 4, 18, 0, 0, 0), // timestamp
});
/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description File random data general
 * @param { function(callback)=>{}}
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @param {number} length
     * @created_at 16/12/2022
     * @description random character
     * @returns {string}
     */
    randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {null}
     * @created_at 16/12/2022
     * @description Method create random sonyflake for user code
     * @returns {number} (64bit - bigint)
     */
    createID() {
        const id = SONY_FLAKE.nextId();
        return id;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {null}
     * @created_at 16/12/2022
     * @description Method decode sony_flake detail
     * @returns data decode (json)
     */
    decodeID(u_code) {
        return SONY_FLAKE.deconstruct(u_code);
    },
};
