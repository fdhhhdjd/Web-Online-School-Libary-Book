module.exports = (req, res, next) => {
    const headers = req.headers.authorization;
    if (headers) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return next();
        }
    }
    return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
    });
};
