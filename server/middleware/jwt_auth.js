const config = require('config');
const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const token = req.header('jwt_token');
    if(!token){
        return res.status(403).send("Unauthorized (No Token)");
    }
    else{
        try {
            const valid = jwt.verify(token, config.get('jwt.secret'));
            req.user = valid.user;
            next();
        } catch (error) {
            console.log(error.message);
            res.status(401).send("Unauthenticated (Token Error)");
        }
    }
}

module.exports = jwtAuth;