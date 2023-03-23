//! SERVICE
const { removeStorage } = require('../../../share/services/remove_cloud_service');

//! MIDDLAWARE
const { returnReasons } = require('../../../share/middlewares/handle_error');

//! SHARE
const CONSTANTS = require('../../../share/configs/constants');

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
            // Take Input
            const { public_id } = req.body.input.remove_public_id;

            // Check input invalid
            if (!public_id) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                });
            }
            // Remove link image cloud
            await removeStorage(public_id)
                .then((result) => res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: result,
                }))
                .catch((error) => {
                    console.error(error);
                    return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                        status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    });
                });
        } catch (error) {
            console.error(error);
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                element: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
            });
        }
    },
};
module.exports.removeCloudController = removeCloudController;
