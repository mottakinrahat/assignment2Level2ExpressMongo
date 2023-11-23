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
const updateSingleUserFromDB = async (id: number, updateUserData: any) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    {$set:updateUserData},
    { new: true }
  );
  return result;
};
const deleteSingleUserFromDB = async (id: number) => {
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });
  return result;
};
// const updateOrderFromDB = async (id: number, updateUserData: any) => {
//   if (!updateUserData.orders) {
//     const result = await UserModel.updateOne(
//       { userId: id },
//       {
//         $set: {
//           orders: [{ productName: String, price: Number, quantity: Number }],
//         },
//       }
//     );
//   } else {
//     const result = await UserModel.updateOne(
//       { userId: id },
//       { $set: { orders: [updateUserData.orders] } }
//     );
//   }
//   return result;
// };

export const UserServices = {
  createUserIntoDB,
  getUserAllFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
