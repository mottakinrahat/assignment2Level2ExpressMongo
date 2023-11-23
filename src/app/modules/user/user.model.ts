import { ordersValidationSchema } from './user.validation';
import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser } from "./user.interface";
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

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, "Id is required"], unique: true },
  username: { type: String, required: [true, "username is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
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
  isDeleted: { type: Boolean, default: false },
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
  doc.password = "";
  next();
});

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const UserModel = model<TUser>("User", userSchema);
