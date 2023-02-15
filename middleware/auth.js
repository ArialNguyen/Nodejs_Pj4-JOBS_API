const jwt = require("jsonwebtoken")
const {Unauthentication, BadRequest, CustomApiError} = require("../errors/AllError")
const authentication = (req, res, next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
        throw new Unauthentication("Not allow to access this route")
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        throw new CustomApiError(error.message)
    }
}

module.exports = {authentication}