const cron = require('node-cron');
const cronCtrl = require('./v1/controllers/cron.controller');
const CONSTANTS = require('../share/configs/constants');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description Run all Cron
 */

cron.schedule(CONSTANTS._5_SECONDS_CRON, () => {
    cronCtrl.cron_demo();
});
console.info('Server cron running !!!');
