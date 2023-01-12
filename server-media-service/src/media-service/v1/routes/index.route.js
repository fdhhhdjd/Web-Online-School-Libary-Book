const router = require('express').Router();
const uploadRouter = require('../routes/upload/upload_cloud_routes');
const removeRouter = require('../routes/remove/remove_cloud__routes');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 12/01/2022
 * @description Route Media
 */
//! UPLOAD 
router.use('/api/v1', uploadRouter);

//! REMOVE
router.use('/api/v1', removeRouter);

router.get('/check-status', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'OK',
    });
});

module.exports = router;
