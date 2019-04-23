const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acess denied.. No Token provided')

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;