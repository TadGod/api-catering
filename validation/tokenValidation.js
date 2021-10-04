const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('token');
    
    if (!token) return res.send('You do not have access');
        const verification = jwt.verify(token, process.env.TOKEN_UNIQUE);
        req.user = verification;
        next();
}