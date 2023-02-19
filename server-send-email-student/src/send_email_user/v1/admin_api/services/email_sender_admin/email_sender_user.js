const { returnReasons } = require('../../../../../share/middlewares/middleware');

const emailSenderUsers = {
    sendEmailUser: async (message) => {
        let message_queue = message
        return console.log('OKKKKKKKK', message_queue)
    }
}
module.exports = emailSenderUsers;
