const requestUser = require('./request.user');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Unit test Auth Admin Api
 */
describe('user_api', () => {
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 04/02/2023
    * @description Unit test Auth Login
    */
    describe('Authentication - Login Student ', () => {
        test('Success - Login student', async () => {
            const res = await requestUser.login_user_test('60137255', '20000531');
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.objectContaining({
                    result: {
                        access_token: expect.any(String),
                        refresh_token: expect.any(String),
                        role: expect.any(Number),
                        user_id: expect.any(String),
                    },
                }),
            });
        });
        test('Error - Input Mssv or Password or Mssv not number', async () => {
            const res = await requestUser.login_user_test('ăâê', '20000531');
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String)
            });
        });
        test('Error - Student Not Exist! ', async () => {
            const res = await requestUser.login_user_test('1111111', '20000531');
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.objectContaining({
                    result: expect.any(String)
                }),
            });
        });
        test('Error - Password Is Incorrect !! ', async () => {
            const res = await requestUser.login_user_test('60136782', '200005311');
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.objectContaining({
                    result: expect.any(String)
                }),
            });
        });
    });
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 05/02/2023
     * @description Renew token
     */
    describe('Authentication - Renew Token Student ', () => {
        test('Error - Missing Device', async () => {
            const res = await requestUser.new_token_user_test();
            console.log(res)
            expect(res.response.status).toBe(400);
            expect(res.response.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String)
            });
        });
    });
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 08/02/2023
    * @description Get Profile Student
    */
    describe('Authentication - Get Profile Student ', () => {
        test('Success', async () => {
            const res = await requestUser.get_profile_user_test();
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                message: expect.any(String),
                element: expect.any(Object)
            });
        });
    });
});
