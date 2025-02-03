import { z } from "zod"

export const EditUserProfileSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
})

export type EditUserProfile = z.infer<typeof EditUserProfileSchema>