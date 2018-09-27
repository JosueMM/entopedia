//Format Of Token
//Authorization: Bearer <token>

//Verify Token
exports.verifyToken = (req, res, next) => {
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split authorization
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {        
        res.send('asdasd').status(403);
    }
}