const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { String, required: true },
    last_name: String,
    email: String,
});

module.exports = mongoose.model('User', userSchema);
