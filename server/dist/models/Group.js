"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        read: {
            type: Boolean,
            required: true
        },
        write: {
            type: Boolean,
            required: true
        }
    },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
const Group = (0, mongoose_1.model)('Group', groupSchema);
exports.default = Group;
