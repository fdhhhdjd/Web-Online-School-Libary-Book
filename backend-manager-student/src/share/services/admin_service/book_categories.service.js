//! SHARE
const RANDOMS = require('../../utils/random');
const CONSTANTS = require('../../configs/constants');

//! MODEL
const book_category_model = require('../../models/book_categories.model');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/04/2023
     * @description handle save book categories
     * @function handleSetCacheRedis
     */
    handleSaveMultiBookCategories: async (book_id, book_categories_array_parse, book_categories) => {
        try {
            // Init data filter
            let data_filter;

            // if book_categories deference empty
            if (book_categories) {
                data_filter = book_categories_array_parse.filter(
                    (item) => !book_categories.some((existingItem) => existingItem.category_id === item.category_id),
                );
            } else {
                // if book_categories null
                // eslint-disable-next-line no-unused-vars
                data_filter = book_categories_array_parse;
            }
            // data_filter equal array empty
            if (Array.isArray(data_filter) && data_filter.length === CONSTANTS.ARRAY.EMPTY) {
                return false;
            } else {
                // Take data in array save database
                for (const data of data_filter) {
                    // create Category database
                    book_category_model.createBookCategories({
                        book_categories_id: RANDOMS.createID(),
                        book_id,
                        category_id: data.category_id,
                    });
                }
                // Save database success
                return false;
            }
        } catch (error) {
            // Save database error
            return true;
        }
    },
};
