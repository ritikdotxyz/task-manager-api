import z from "zod";

const addTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "ON_PROGRESS", "COMPLETED"], {
        error: () => ({
            message: "Status must be one of:   PENDING, ON_PROGRESS, COMPLETED"
        })
    })
})

const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "ON_PROGRESS", "COMPLETED"], {
        error: () => ({
            message: "Status must be one of: PENDING, ON_PROGRESS, COMPLETED"
        })
    }).optional()
})

export { addTaskSchema, updateTaskSchema };