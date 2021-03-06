require('dotenv').config({path: '../../../.env.local'});
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.REACT_APP_TOKEN_KEY);
        const student = await Student.findOne({_id : payload._id, 'tokens.token' : token});
        if(!student)throw new Error();
        req.student = student;
        req.token = token;
        next();
    }
    catch(error){
        res.status(401).json({error : error.message});
    }
}

module.exports = auth;