const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Sorry! Not Authorized.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'SECRET');
        // return console.log(decodedToken)
        req.userData = {
            userId: decodedToken._id
        };
        next();
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Authorization Error!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken._id;

}
