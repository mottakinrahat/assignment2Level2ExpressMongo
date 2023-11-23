import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const getUserAllFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};
const updateSingleUserFromDB = async (id: number, updateUserData: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: updateUserData },
    { new: true }
  );
  return result;
};
const deleteSingleUserFromDB = async (id: number) => {
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });
  return result;
};
const createOrderFromDB = async (id: number, updateUserData: TUser) => {
  const userId = { userId: id };
  const updateTheSetMethod = { $push: { orders: updateUserData } };
  if (await UserModel.isUserExists(updateUserData.userId)) {
    throw new Error("user exists");
  }
  const result = await UserModel.findOneAndUpdate(userId, updateTheSetMethod, {
    new: true,
  });
  return result;
};

const getSingleOrder = async (id: number) => {
  const result = await UserModel.findOne({ userId: id }, { orders: 1, _id: 0 });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserAllFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  createOrderFromDB,
  getSingleOrder,
};
