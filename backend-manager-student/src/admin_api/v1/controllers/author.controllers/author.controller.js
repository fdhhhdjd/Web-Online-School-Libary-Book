//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const author_model = require('../../../../share/models/author.model');

const authorController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description create Author
     * @function createAuthor
     * @return {Object:{Number,String}}
     */
    createAuthor: async (req, res) => {
        const { name, avatar_uri, dob, gender, nation } = req.body.input.author_input;

        // Check input
        if (!name || !avatar_uri || !dob || !gender || !nation) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // create author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                author_model.createAuthor({
                    author_id: RANDOMS.createID(),
                    name,
                    avatar_uri,
                    dob,
                    gender,
                    nation,
                }),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description update Author
     * @function updateAuthor
     * @return {Object:{Number,String}}
     */
    updateAuthor: async (req, res) => {
        const { author_id, name, avatar_uri, dob, gender, nation } = req.body.input.author_input;

        // Check input
        if (!author_id || !HELPER.validateBigInt(author_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        // Check Input is empty
        if (
            (name !== undefined && name.trim() === '')
            || (avatar_uri !== undefined && avatar_uri.trim() === '')
            || (dob !== undefined && dob.trim() === '')
            || (nation !== undefined && nation.trim() === '')
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_MUTILP_FIELD,
                },
            });
        }

        // Check date
        const birthday = new Date(dob); // dob from author input
        const today = new Date(); // date now

        // Compare date  dob and date now
        if (birthday >= today) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_DATE,
                },
            });
        }

        try {
            // update author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                author_model.updateAuthor(
                    {
                        name,
                        avatar_uri,
                        dob,
                        gender,
                        nation,
                    },
                    { author_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { author_id: 'author_id' },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description delete Author
     * @function deleteAuthor
     * @return {Object:{Number,String}}
     */
    deleteAuthor: async (req, res) => {
        const { author_id } = req.body.input.author_input;

        // Check input
        if (!author_id || !HELPER.validateBigInt(author_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Check account  already delete
            const result_author_detail = await author_model.getAuthorById(
                { author_id, isdeleted: CONSTANTS.DELETED_ENABLE },
                { author_id: 'author_id' },
            );

            if (result_author_detail.length > 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_DELETE_AUTHOR,
                    },
                });
            }
            // Delete author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                author_model.updateAuthor(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    { author_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { author_id: 'author_id' },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description detail Author
     * @function getDetailAuthor
     * @return {Object:{Number,String}}
     */
    getDetailAuthor: async (req, res) => {
        const author_id = req.params.author_id;
        // Check input
        if (!author_id) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // detail author database
            const result_author_detail = await author_model.getAuthorById(
                { author_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_author_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_author_detail[0],
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Get all Author
     * @function getAllAuthor
     * @return {Object:{Number,String}}
     */
    getAllAuthor: async (req, res) => {
        try {
            // detail author database
            const result_author_detail = await author_model.getAllAuthor({ isdeleted: CONSTANTS.DELETED_DISABLE }, '*');
            if (result_author_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_author_detail,
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
};
module.exports = authorController;
