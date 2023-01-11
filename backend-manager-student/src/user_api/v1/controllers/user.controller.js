const admin_service = require('../../../share/services/admin.service');
const user_service = require('../../../share/models/user.model');
const helper = require('../../../share/utils/helper');

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

            const geo = helper.findingLocationByIP(ip) || helper.findingLocationByIP('14.165.41.226');
            console.info(geo, '-------------', device);
            const data = await admin_service.createAdmin('oke');
            const user_service_data = await user_service.addUser({
                name: 'Tài Heo',
            });
            console.info(user_service_data);
            if (data !== 'oke') {
                return res.status(400).json({
                    status: 400,
                    message: 'error',
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
                },
                message: 'success',
            });
        } catch (err) {
            console.error(err);
            return res.status(503).json({
                status: 503,
                message: 'Out Of Service',
            });
        }
    },
};
module.exports = adminController;
