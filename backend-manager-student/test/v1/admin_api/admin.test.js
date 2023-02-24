const requestAdmin = require('./request.admin');
const CONFIGS = require('../configs/config');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Unit test Auth Admin Api
 */
describe('admin_api', () => {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @description Unit test Auth Login
     */
    describe('Authentication - Login Admin ', () => {
        test('Success - Login admin', async () => {
            const res = await requestAdmin.login_Admin_Test('fdhhhdjd', 'Taiheo123@');
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                data: expect.any(Object),
                message: expect.any(String),
            });
        });
    });
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 02/02/2023
     * @description Unit test Auth Login
     */
    describe('Admin - Add Student ', () => {
        test('Nothing changes to update -  Success', async () => {
            const res = await requestAdmin.add_student_admin_test(CONFIGS.XLSX_SUCCESS);
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Object),
            });
        });
        test('Invalid email or phone number! or Email or Phone or Email or Mssv exits ! -  Error', async () => {
            const res = await requestAdmin.add_student_admin_test(CONFIGS.XLSX_FAIL_DATA_EXIT);
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Object),
            });
        });
        test(' Service Unavailable -  Error', async () => {
            const res = await requestAdmin.add_student_admin_test(CONFIGS.XLSX_FAIL_DATABSE);
            expect(res.response.status).toBe(503);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
            });
        });
        test('Success', async () => {
            const res = await requestAdmin.add_student_admin_test(CONFIGS.XLSX_SUCCESS);
            expect(res.status).toBe(201);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Array),
            });
        });
    });
});
