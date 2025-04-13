const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("./config");

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7);
    } else {
        request.token = null;
    }
    next();
}

const userExtractor = async (request, response, next) => {
    const token = request.token

    if (!token) {
        request.user = null
        next()
        return
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    if (!decodedToken.id) {
        request.user = null
        next()
        return
    }

    request.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}