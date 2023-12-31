import { AnyZodObject, z } from "zod";

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
  userId: z.number({ required_error: "userId is required" }),
  username: z
    .string({ required_error: "username is required and should be unique" })
    .min(1)
    .max(255),
  password: z.string({ required_error: "password is required" }),
  fullName: fullNameValidationSchema,
  age: z.number({ required_error: "age is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email()
    .min(1)
    .max(255),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(ordersValidationSchema).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
