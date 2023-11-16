"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    groups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Group' }],
    tickets: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Ticket' }]
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
