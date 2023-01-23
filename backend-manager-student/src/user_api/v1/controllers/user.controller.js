const user_service = require('../../../share/models/user.model');
const HELPER = require('../../../share/utils/helper');
const RANDOM = require('../../../share/utils/random');
const { returnReasons } = require('../../../share/middleware/handle_error');

const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @description Login user
     * @function LoginUser
     * @param { null }
     * @return {Object:{Number,String}
     */
    LoginUser: async (req, res) => {
        const { user_name, password } = req.body.input.user_login_input;
        try {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

            const { device } = req;

            const geo = HELPER.findingLocationByIP(ip) || HELPER.findingLocationByIP('14.165.41.226');
            console.info(geo, '-------------', device);
            const data_insert = {
                name: 'Tài Heo',
            };
            let err;
            let result;
            [err, result] = await await HELPER.handleRequest(user_service.addUser(data_insert));
            console.info(result, '----Insert data success------');
            const _OTP = RANDOM.generatorOtp();
            const _ID = RANDOM.createID();
            if (err) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }
            return res.status(200).json({
                status: 200,
                data: {
                    user_name,
                    password,
                    geo,
                    ip,
                    device,
                    _OTP,
                    _ID,
                },
                message: returnReasons('200'),
            });
        } catch (err) {
            console.error(err);
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    service: 'Out Of Service',
                },
            });
        }
    },
};
module.exports = adminController;
