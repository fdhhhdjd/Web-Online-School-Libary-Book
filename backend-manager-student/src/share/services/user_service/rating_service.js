module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description handle rating
     * @function Caculation rating
     */
    handleCalculationRating: (ratings, rating_input) => {
        ratings.push({ rating: rating_input });

        const sum = ratings.reduce((acc, cur) => acc + parseFloat(cur.rating), 0);

        // Tính trung bình cộng
        const avg = sum / ratings.length;
        const roundedAvg = Math.round(avg * 2) / 2;
        return roundedAvg;
    },
};
