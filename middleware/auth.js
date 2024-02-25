const jwt = require("jsonwebtoken");


module.exports = function (req , res , next) {
    const token = req.header("token");
    if (!token) {
        return res.status(401).send("axxess rejected ...");
    };


    try {

        const decodeToken = jwt.verify(token , 'privatekey');
        req.user = decodeToken;
        next();
    } catch (error) {
        res.status(400).send("the Token Is Wornd ....");
    }
};


