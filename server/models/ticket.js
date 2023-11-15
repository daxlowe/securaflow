const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        body:
        {
            type: String, 
            required: true
        }, 
        date: 
        {
            date: Date, 
            required: true
        }
    }
);

const ticketSchema = new Schema(
    {
        name:
        {
            type: String, 
            required: true
        }, 
        description:
        {
            type: String, 
            required: true
        },
        difficulty:
        {
            type: Number,
            required: true
        }, 
        assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        time_estimate: 
        {
            type: Number
        },
        current_status: 
        {
            type: String, 
            required: true
        },
        status_updates: [statusSchema],
        vulnerability:
        {
            name:
            {
                type: String, 
                required: true
            }, 
            cve_id: 
            {
                type: String
            },
            priority:
            {
                type: String, 
                required: true
            }, 
            imported_from: 
            { 
                type: String
            }
        }, 
        comments: [String], 
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);