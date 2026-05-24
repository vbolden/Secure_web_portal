const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }

    try {
        const decoded = jwt.verify(token, secret, { maxAge: '2h' });
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid token."
        });
    }
}

module.exports = authMiddleware;