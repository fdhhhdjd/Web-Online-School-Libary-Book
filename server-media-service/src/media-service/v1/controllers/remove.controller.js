//! SERVICE
const { removeStorage } = require('../../../share/services/remove_cloud_service');

//! MIDDLAWARE
const { returnReasons } = require('../../../share/middlewares/handle_error');

const removeCloudController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description remove image storage cloud
     * @function removeCloud
     * @param { public_id}
     * @return {Object}
     */
    removeCloud: async (req, res) => {
        try {
            const { public_id } = req.body.input.remove_public_id;
            if (!public_id) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }
            await removeStorage(public_id)
                .then((result) =>
                    res.status(200).json({
                        status: 200,
                        message: returnReasons('200'),
                        element: result,
                    }),
                )
                .catch((error) => {
                    console.error(error);
                    return res.status(500).json({
                        status: 500,
                        message: returnReasons('500'),
                    });
                });
        } catch (error) {
            console.error(error);
            return res.status(503).json({
                status: 503,
                element: returnReasons('503'),
            });
        }
    },
};
module.exports.removeCloudController = removeCloudController;
