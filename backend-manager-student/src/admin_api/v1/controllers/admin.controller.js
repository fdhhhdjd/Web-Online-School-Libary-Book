const { globalCache } = require('../../../share/patterns/LRU_Strategy.patterns');

const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @update_at 11/01/2023
     * @description Login admin,add cache demo
     * @function LoginAdmin
     * @param { null }
     * @return {Object:{Number,String}
     */
    LoginAdmin: async (req, res) => {
        const { user_name, password } = req.body.input.admin_login_input;
        globalCache.putCache(user_name, password);
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    user_name,
                    password,
                },
                message: 'success',
                element1: globalCache.getCache(user_name),
            });
        } catch (err) {
            return res.status(503).json({
                status: 503,
                message: 'Out Of Service',
            });
        }
    },
};
module.exports = adminController;
