const requestAdmin = require('./request.admin');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Unit test Auth Admin Api
 */
describe('admin_api', () => {
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
});
