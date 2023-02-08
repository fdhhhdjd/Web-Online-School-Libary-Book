const router = require('express').Router();
const userRouter = require('./users/user.route');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023
 * @description Route Users
 */
router.use('/api/v1/user', userRouter);

router.get('/check-status', (req, res) =>
    res.status(200).json({
        status: 'success',
        message: 'OK',
    }),
);

module.exports = router;
