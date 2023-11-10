const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
};
