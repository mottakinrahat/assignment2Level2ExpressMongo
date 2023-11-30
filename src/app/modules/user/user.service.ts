import { TOrders, TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const exists = await UserModel.isUserExists(user.userId);
  if (exists) {
    throw new Error("User is already exist");
  }

  const result = await UserModel.create(user, {});
  return result;
};
const getUserAllFromDB = async () => {
  const result = await UserModel.find(
    {},
    { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }
  const result = await UserModel.findOne(
    { userId: id },
    { _id: 0, orders: 0, password: 0, isDeleted: 0 }
  );
  return result;
};
const updateSingleUserFromDB = async (id: number, updateUserData: TUser) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }

  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: updateUserData },
    { new: true, projection: { password: 0, _id: 0, orders: 0, isDeleted: 0 } }
  );
  return result;
};
const deleteSingleUserFromDB = async (id: number) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });
  return result;
};
const createOrderFromDB = async (id: number, updateOrderData: TOrders) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }
  const userId = { userId: id };
  const updateTheSetMethod = { $push: { orders: updateOrderData } };

  const result = await UserModel.findOneAndUpdate(userId, updateTheSetMethod, {
    new: true,
  });
  return result;
};

const getSingleOrder = async (id: number) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }

  const result = await UserModel.findOne({ userId: id }, { orders: 1, _id: 0 });
  return result;
};
const getTotalPrice = async (id: number) => {
  const exists = await UserModel.isUserExists(id);
  if (!exists) {
    throw new Error("User does not exist");
  }

  const aggregation = [
    {
      $match: { userId: id },
    },
    {
      $unwind: "$orders",
    },
    {
      $group: { _id: null, totalPrice: { $sum: "$orders.price" } },
    },
    {
      $project: { _id: 0 },
    },
  ];
  const result = await UserModel.aggregate(aggregation);

  if (result.length > 0) {
    return result;
  } else {
    return "You have no price in orders";
  }
};

export const UserServices = {
  createUserIntoDB,
  getUserAllFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  createOrderFromDB,
  getSingleOrder,
  getTotalPrice,
};
