"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statusSchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: true
    },
    date_started: {
        type: Date,
        required: true
    },
    date_ended: {
        type: Date
    }
});
const ticketSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    assignees: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
    },
    time_estimate: {
        type: Number
    },
    current_status: {
        type: String,
        required: true
    },
    status_updates: {
        type: [statusSchema]
    },
    vulnerability: {
        name: {
            type: String,
            required: true
        },
        cve_id: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        imported_from: {
            type: String,
        }
    },
    comments: {
        type: [String]
    }
});
const Ticket = (0, mongoose_1.model)('Ticket', ticketSchema);
exports.default = Ticket;
