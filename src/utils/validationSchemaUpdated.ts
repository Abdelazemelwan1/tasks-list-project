import {z} from "zod"
const ALLOWED_STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED"] as const;
// Updated Task Schema 

export const UpdatedTaskSchema = z.object({
    title: z.string({
        error: (issue) =>
        issue.input === undefined
            ? "title is required"
            : "title should be of type string"
        }).min(2 , {message : "title should be at least 2 characters long"})
        .max(200, {message: 'title should be less then 200 characters'}),
    description: z.string({
        error: (issue) =>
        issue.input === undefined
            ? "description is required"
            : "description should be of type string"
        }).min(2 , {message : "description should be at least 2 characters long"}),
    status: z.string().refine((val) => ALLOWED_STATUSES.includes(val as any), {
    message: "Invalid status value",
  }),

})