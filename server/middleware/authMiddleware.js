const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const requireAuth = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (err) {
            next(err);
        }
    }
    if (!token) {
        const err = new Error('Not Authorized, No Token');
        err.status = 401;
        next(err);
    }
});
const requireAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        const err = new Error('Not authorized as an admin');
        err.status = 401;
        next(err);
    }
});
module.exports = { requireAuth, requireAdmin };
