const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @description Login admin
     * @function LoginAdmin
     * @param { null }
     * @return {Object:{Number,String}
     */
    LoginAdmin: async (req, res) => {
        const { user_name, password } = req.body.input.admin_login_input;
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    user_name,
                    password,
                },
                message: 'success',
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
