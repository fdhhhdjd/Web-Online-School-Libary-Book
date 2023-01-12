const { globalCache } = require('../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../share/middleware/handle_error')
const { takeDataStudent } = require('../../../share/services/admin.service');
const HELPER = require('../../../share/utils/helper');
const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @update_at 11/01/2023
     * @description Login admin,add cache demo
     * @function LoginAdmin
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
                message: returnReasons('200'),
                element1: globalCache.getCache(user_name),
            });
        } catch (err) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
            });
        }
    },
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 12/01/2023
    * @description add feature take excel
    * @function LoginAdmin
    * @return {Object}
    */
    AddStudent: async (req, res) => {
        const sheets = HELPER.getDataExcel()

        let result = takeDataStudent(sheets)

        return res.status(200).json({
            status: 200,
            message: returnReasons('200'),
            element: result
        });
    }
};
module.exports = adminController;
