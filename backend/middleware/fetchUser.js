const jwt = require('jsonwebtoken');

const JWT_SECRET_TOKEN = "AnirudhPanwar2000";

const fetchUser = (req, res, next) => {
    //Get the user fom the JWT Token
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Invalid Token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Invalid Token"});
    }
}
module.exports = fetchUser;
