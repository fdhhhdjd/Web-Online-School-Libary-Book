//! LIBRARY
const TelegramBot = require('node-telegram-bot-api');

//! SHARE
const CONSTANTS = require('../configs/constants');
const CONFIGS = require('../configs/config');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/03/2023
 * @description BOT TELEGRAM
 */
const token = CONFIGS.KEY_TELEGRAM;
const { KEY_CHAT_ID } = CONFIGS;
// Create a bot that uses 'polling' to fetch new updates
const BOT = new TelegramBot(token, { polling: CONSTANTS.DELETED_ENABLE });

module.exports = { BOT, KEY_CHAT_ID };
