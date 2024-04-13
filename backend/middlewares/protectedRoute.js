const jwt = require('jsonwebtoken');
const authModel = require('../models/auth_model');
const dotenv = require('dotenv').config();

const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    try {
        if (!authHeader) {
            return res.status(401).json({ message: "You are unauthorized!" });
        }

        const token = authHeader.replace('Bearer ', "");

        if (!token) {
            return res.status(401).json({ message: "You are Unauthorized!!" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "You are unauthorized!" });
        }

        const user = await authModel.findOne({email:decodedToken},{password:0})
        if (!user) {
            return res.status(401).json({ message: "You are unauthorized!" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!" });
    }
}

module.exports = authenticate;