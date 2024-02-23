import z, { object, number, string, instanceof as instanceof_, array, TypeOf, date } from 'zod';
import mongoose, { ObjectId, Date } from 'mongoose';

const objectIDSchema = string().refine((val: string) => {
            return mongoose.Types.ObjectId.isValid(val)
          })

const statusSchema = object({
    body: string({
        required_error: "Type is required"
    }), 
    date_started: date().optional(), 
    date_ended: date().optional()
})

const vulnerabilitySchema = object({
    name: string({
        required_error: "Vulnerability name is required"
    }), 
    description: string({
        required_error: "Vulnerability description is required"
    }), 
    cve_id: string({
        required_error: "Vulnerability CVE_ID is required"
    }),
    priority: string({
        required_error: "Vulnerability priority is required"
    }),
    imported_from: string().optional()
})

const payload = 
{
    body: object({
        title: string({
            required_error: "Title is required"
        }), 
        team: objectIDSchema.array().optional(), 
        description: string({
            required_error: "Description is required"
        }), 
        difficulty: number().optional(), 
        assignees: objectIDSchema.array(),
        time_estimate: number().optional(),
        status_updates: statusSchema.array().optional(),
        vulnerability: vulnerabilitySchema.required(),
        comments: string().array().optional(),
        createdBy: objectIDSchema.optional()

    })
}

const params = 
{
    params: object({
        ticketID: string({
            required_error: "Ticket ID is required"
        })
    })
}

export const createTicketSchema = object({
    ...payload
})

export const updateTicketSchema = object({
    ...payload,
    ...params,
})

export const getTicketSchema = object({
    ...params
})

export const deleteTicketSchema = object({
    ...params
})

export type createTicketInput = TypeOf<typeof createTicketSchema>
export type updateTicketInput = TypeOf<typeof updateTicketSchema>
export type getTicketInput = TypeOf<typeof getTicketSchema>
export type deleteTicketInput = TypeOf<typeof deleteTicketSchema>