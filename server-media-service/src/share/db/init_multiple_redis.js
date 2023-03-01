//! LIBRARY
const IOREDIS = require('ioredis');

//! SHARE
const CONFIGS = require('../configs/config');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Connect Cache Redis Master
 */
const REDIS_MASTER = new IOREDIS({
    port: CONFIGS.REDIS_PORT,
    host: CONFIGS.REDIS_HOST,
    user: CONFIGS.REDIS_USER,
    password: CONFIGS.REDIS_PASSWORD,
});

REDIS_MASTER.on("connect", () => {
    console.log("Client connected to redis Push...");
});
REDIS_MASTER.on("ready", () => {
    console.log("Client connected to redis push and ready to use...");
});
REDIS_MASTER.on("error", (error) => {
    console.log("fail");
});
REDIS_MASTER.on("end", () => {
    console.log("Client disconnected from redis push");
});
REDIS_MASTER.on("SIGINT", () => {
    REDIS_MASTER.quit();
});

module.exports = REDIS_MASTER;
