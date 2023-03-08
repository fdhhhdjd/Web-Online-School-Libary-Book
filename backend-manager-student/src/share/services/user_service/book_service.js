module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @description handle Quantity
     * @function Check Quantity book
     */
    handleCheckQuantityBook: async (book) => {
        try {
            if (book.quantity > 0) {
                return false
            }
            return true
        } catch (error) {
            return true
        }
    },
};
