import { z } from "zod";

export const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(255),
  lastName: z.string().trim().min(1).max(255),
});

export const addressValidationSchema = z.object({
  street: z.string().trim().min(1).max(255),
  city: z.string().trim().min(1).max(255),
  country: z.string().trim().min(1).max(255),
});

export const ordersValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(100),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email().min(1).max(255),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(ordersValidationSchema),
});

export default userValidationSchema;