const User= require('../model/user.model')

exports.createUser = async (req, res, next) => {
    try{
        console.log(`Hello its Working${req.body}${req.body.firstName}`);
        const user = await User.create(req.body);
        console.log(`Yes it is working${user}`);
        return res.success(`User Created`,user);
    }
    catch(err){
    }
};

exports.createUser = async (req, res, next) => {
    try{
        console.log(`Hello its Working${req.body}${req.body.firstName}`);
        const user = await User.create(req.body);
        console.log(`Yes it is working${user}`);
        return res.success(`User Created`,user);
    }
    catch(err){
    }
};