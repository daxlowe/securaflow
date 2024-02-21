import { object, string, TypeOf } from 'zod';

export const createUserSchema = object(
    {
        body: object({
            first_name: string({
                required_error: 'First name is required'
            }),
            last_name: string({
                required_error: "Last name is required"
            }),
            password: string({
                required_error: 'Password is required'
            }).min(6, 'Password must be at least 6 characters'),
            passwordConfirmation: string({
                required_error: 'Please confirm password'
            }),
            email: string({
                required_error: 'Email is required',
            }).email('Not a valid email'),
        }).refine((data) => data.password === data.passwordConfirmation, {
            message: "Passwords do not match",
            path: ["passwordConfirmation"]
        }),
    });

    export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;