//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const RANDOMS = require('../../../../share/utils/random');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const favorite_model = require('../../../../share/models/favorite.model');

const FavoriteController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description create Favorite
     * @function createFavorites
     * @return {Object:{Number,String}}
     */
    createFavorites: async (req, res) => {
        const { book_id } = req.body.input.favorite_input;

        // Take user Id
        const { id } = req.auth_user;

        // Check input
        if (!HELPER.validateBigInt(book_id) || !HELPER.validateBigInt(id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            const check_favorite_exits = await favorite_model.getFavoriteById(
                {
                    book_id,
                    user_id: id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    favorite_book_id: 'favorite_book_id',
                },
            );
            if (check_favorite_exits[0]) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.ALREADY_FAVORITE,
                    },
                });
            }
            // create favorite database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                favorite_model.createFavorite({
                    favorite_book_id: RANDOMS.createID(),
                    book_id,
                    user_id: id,
                }),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].favorite_book_id,
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
     * @created_at 04/04/2023
     * @description Delete Favorite
     * @function deleteFavorites
     * @return {Object:{Number,String}}
     */
    deleteFavorites: async (req, res) => {
        const { favorite_book_id } = req.body.input.favorite_input;

        // Check input
        if (!HELPER.validateBigInt(favorite_book_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            const check_favorite_exits = await favorite_model.getFavoriteById(
                {
                    favorite_book_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    favorite_book_id: 'favorite_book_id',
                },
            );
            if (!check_favorite_exits || !check_favorite_exits.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_FAVORITE,
                    },
                });
            }
            // create favorite database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                favorite_model.updateFavorite(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    {
                        favorite_book_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    {
                        favorite_book_id: 'favorite_book_id',
                    },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].favorite_book_id,
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
     * @created_at 04/04/2023
     * @description get all Favorite
     * @function createFavorites
     * @return {Object:{Number,String}}
     */
    getallFavorites: async (req, res) => {
        try {
            // Take user Id
            const { id } = req.auth_user;

            // Take data db
            const result_favorite = await favorite_model.getAllFavorite(
                {
                    'favorite_book.user_id': id,
                    'favorite_book.isdeleted': CONSTANTS.DELETED_DISABLE,
                },
                'favorite_book.*',
            );
            if (result_favorite) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_favorite,
                    },
                });
            }
        } catch (error) {
            console.error(error);
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
module.exports = FavoriteController;
