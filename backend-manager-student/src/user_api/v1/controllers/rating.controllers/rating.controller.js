//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const MEMORY_CACHE = require('../../../../share/utils/limited_redis');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');
const { globalCache } = require('../../../../share/patterns/LRU_Strategy.patterns');

//! MODEL
const rating_model = require('../../../../share/models/rating.model');
const borrow_book_model = require('../../../../share/models/book_borrowed.model');

//! SERVICE
const rating_service = require('../../../../share/services/user_service/rating_service');

const ratingController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description create rating
     * @function CreateRating
     * @return {Object:{Number,String}}
     */
    createRating: async (req, res) => {
        const { borrowed_book_id, book_id, rating } = req.body.input.rating_input;

        // Take user Id
        const { id } = req.auth_user;
        // Check input
        if (
            !HELPER.validateBigInt(book_id)
            || !HELPER.validateBigInt(rating)
            || !HELPER.validateBigInt(id)
            || !HELPER.validateBigInt(borrowed_book_id)
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        if (rating > 5 || rating % 1 !== 0) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_RATING,
                },
            });
        }

        try {
            // Check Borrow book user_id
            const getBorrowBook = await borrow_book_model.getBorrowBookById(
                {
                    borrowed_book_id,
                    user_id: id,
                    status: CONSTANTS.STATUS_BORROW.DONE,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    borrowed_book_id: 'borrowed_book_id',
                },
            );
            if (!getBorrowBook || !getBorrowBook.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BORROW_BOOK,
                    },
                });
            }

            // Check student already comment
            const getRatingStudent = await rating_model.getRatingsById(
                {
                    user_id: id,
                    book_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    rate_id: 'rate_id',
                },
            );
            if (getRatingStudent[0]) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.ALREADY_RATING_BOOK,
                    },
                });
            }

            const rating_db = await rating_model.getAllRatings(
                {
                    book_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                { rating: 'rating' },
            );
            let star;
            if (rating_db) {
                star = rating_service.handleCalculationRating(rating_db, rating);
            } else {
                star = rating;
            }

            // create rating database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                rating_model.createRatings({
                    rate_id: RANDOMS.createID(),
                    book_id,
                    user_id: id,
                    rating: star,
                }),
            );
            if (result) {
                // Create key Cache
                const key_cache_book_detail = HELPER.getURIFromTemplate(CONSTANTS.KEY_REDIS.DETAIL_BOOK, {
                    book_id,
                });

                // Delete Cache book
                MEMORY_CACHE.delKeyCache(CONSTANTS.KEY_REDIS.ALL_BOOK);

                // Delete cache detail
                globalCache.delCache(key_cache_book_detail);

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: MESSAGES.GENERAL.SUCCESS_RATING_SUCCESS,
                    },
                });
            } else if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    element: {
                        result: MESSAGES.GENERAL.RATING_FAIL,
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
module.exports = ratingController;
