module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/02/2023
     * @description handle Calculation count block
     * @function createAdmin
     * @param { count,limitCount }
     * @return {Number}
     */
    calculationBlock: (count, countLimit) => {
        if (!count) {
            return countLimit;
        }
        const result = +countLimit - parseInt(count);
        return result;
    },
};
