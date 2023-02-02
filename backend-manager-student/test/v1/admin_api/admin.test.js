const requestAdmin = require('./request.admin');
const CONSTANTS = require('../configs/constants')
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
        test('Success', async () => {
            const res = await requestAdmin.add_student_admin_test('https://res.cloudinary.com/taithinhnam/raw/upload/v1675327422/library_school_document/document/123456/false/1675327421063-register_1.xlsx');
            expect(res.status).toBe(201);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Array),
            });
        });
        test('Nothing changes to update -  Success', async () => {
            const res = await requestAdmin.add_student_admin_test('https://res.cloudinary.com/taithinhnam/raw/upload/v1675327422/library_school_document/document/123456/false/1675327421063-register_1.xlsx');
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Object),
            });
        });
        test('Invalid email or phone number! or Email or Phone or Email or Mssv exits ! -  Error', async () => {
            const res = await requestAdmin.add_student_admin_test('https://res.cloudinary.com/taithinhnam/raw/upload/v1675333740/library_school_document/document/123456/false/1675333738836-register_1.xlsx');
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Object),
            });
        });
        test(' Service Unavailable -  Error', async () => {
            const res = await requestAdmin.add_student_admin_test('https://res.cloudinary.com/taithinhnam/raw/upload/v1675335142/library_school_document/document/123456/false/1675335140506-register_1.xlsx');
            console.log(res, '-----')
            expect(res.response.status).toBe(503);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
            });
        });
    });
});
