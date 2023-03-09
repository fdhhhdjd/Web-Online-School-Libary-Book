//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const author_model = require('../../../../share/models/author.model');

const authorController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description create Author
     * @function createAuthor
     * @return {Object:{Number,String}
     */
    createAuthor: async (req, res) => {
        const {
            name, avatar_uri, dob, gender,
        } = req.body.input.author_input;

        // Check input
        if (!name || !avatar_uri || !dob || !gender) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
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
                }),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description update Author
     * @function updateAuthor
     * @return {Object:{Number,String}
     */
    updateAuthor: async (req, res) => {
        const {
            author_id, name, avatar_uri, dob, gender,
        } = req.body.input.author_input;

        // Check input
        if (!name || !avatar_uri || !dob || !gender || !author_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
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
                    },
                    { author_id },
                    { author_id: 'author_id' },
                ),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description delete Author
     * @function deleteAuthor
     * @return {Object:{Number,String}
     */
    deleteAuthor: async (req, res) => {
        const { author_id } = req.body.input.author_input;

        // Check input
        if (!author_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Check account  already delete
            const result_author_detail = await author_model.getAuthorById(
                { author_id, isdeleted: CONSTANTS.DELETED_ENABLE },
                { author_id: 'author_id' },
            );

            if (result_author_detail.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Author already delete !',
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
                    { author_id },
                    { author_id: 'author_id' },
                ),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].author_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description detail Author
     * @function getDetailAuthor
     * @return {Object:{Number,String}
     */
    getDetailAuthor: async (req, res) => {
        const author_id = req.params.author_id;
        // Check input
        if (!author_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // detail author database
            const result_author_detail = await author_model.getAuthorById(
                { author_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_author_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_author_detail[0],
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description Get all Author
     * @function getAllAuthor
     * @return {Object:{Number,String}
     */
    getAllAuthor: async (req, res) => {
        try {
            // detail author database
            const result_author_detail = await author_model.getAllAuthor({ isdeleted: CONSTANTS.DELETED_DISABLE }, '*');
            if (result_author_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_author_detail,
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
};
module.exports = authorController;
