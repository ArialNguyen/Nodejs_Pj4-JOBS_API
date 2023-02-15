const User = require("../models/Users")
const {StatusCodes} = require('http-status-codes')
const {CustomApiError, BadRequest, Unauthentication} = require("../errors/AllError")

const jwt = require("jsonwebtoken")
const register = async (req, res) => {
    // mongoose checked validtion
    const user = await User.create(req.body)
    if(!user){
        throw new CustomApiError()
    }
    const token = user.createToken() 
    res.status(StatusCodes.CREATED).json({user,token})
}

const login = async (req, res) => {
    // decoded Password
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomApiError("This information must be fullfill")
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new Unauthentication(`${email} didn't register yet`)
    }
    const result = await user.HashedAndCompared_Password(password)
    if(!result){
        throw new CustomApiError("Wrong Password")
    }
    const token = user.createToken()
    res.status(StatusCodes.OK).json({user: {name: user.username}, token})
}
 
module.exports = {login, register}