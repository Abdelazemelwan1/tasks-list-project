import {z} from "zod"

// Create Task Schema 

export const createTaskSchema = z.object({
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
})