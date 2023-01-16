module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @description handle Db admin
     * @function createAdmin
     * @param { data }
     * @return {String}
     */
    createAdmin: async (data) => data,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description handle data from excel
     * @function takeDataStudent
     * @param { Array }
     * @return {Json}
     */
    takeDataStudent: (sheets) => {
        // Lấy sheet đầu tiên trong file
        const sheet = sheets[0];

        // Lấy danh sách các hàng trong sheet
        const rows = sheet.data;

        // Lấy các tiêu đề cột từ hàng đầu tiên
        const headers = rows[0];

        // Tạo mảng rỗng để lưu dữ liệu

        const data = [];
        for (let i = 1; i < rows.length; i++) {
            // Tạo object để lưu thông tin của từng hàng
            const rowData = {};

            // Duyệt từng cột trong hàng
            for (let j = 0; j < headers.length; j++) {
                // Lấy tên cột từ tiêu đề cột và gán giá trị từ hàng hiện tại vào object
                rowData[headers[j]] = rows[i][j];
            }

            // Thêm object vào mảng data
            data.push(rowData);
        }
        return data;
    },
};
