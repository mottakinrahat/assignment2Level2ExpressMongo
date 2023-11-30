import { ordersValidationSchema } from "./user.validation";
import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  TUserModel,
} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
  },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, TUserModel>({
  userId: { type: Number, required: [true, "Id is required"], unique: true },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"]},
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: { type: addressSchema, required: true },
  orders: {
    type: [orderSchema],
  },
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_url));
  next();
});

userSchema.post("save", async function (doc, next) {
  if (doc) {
    doc.password = "";
  }
  next();
});

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

export const UserModel = model<TUser, TUserModel>("User", userSchema);
