import { Schema, model } from "mongoose";
import { TAddress, TFullName, TUser } from "./user.interface";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, "Street is required"], trim: true },
  city: { type: String, required: [true, "City is required"], trim: true },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
  },
});

// const orderSchema = new Schema<TOrders>({
//   productName: {
//     type: String,
//     required: [true, "Product is required"],
//     trim: true,
//   },
//   price: { type: Number, required: [true, "Price is required"] },
//   quantity: { type: Number, required: [true, "Quantity is required"] },
// });

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, "Id is required"], unique: true },
  username: { type: String, required: [true, "username is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: { type: addressSchema, required: true },
  //   orders: {
  //     type: orderSchema,
  //     required: true,
  //   },
});

export const UserModel = model<TUser>("User", userSchema);
