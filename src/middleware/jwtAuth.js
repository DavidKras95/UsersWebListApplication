

const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Please Login' });
    }
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
}



