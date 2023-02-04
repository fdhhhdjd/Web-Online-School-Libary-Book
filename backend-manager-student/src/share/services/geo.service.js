const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/02/2023
     * @description Coordinates Geo GPS IP
     * @function geoGPS
     * @param { latitude,longitude}
     * @return {String}
     */
    geoGPS: (latitude, longitude) => knex.raw(`point(${latitude}, ${longitude})`),
};
