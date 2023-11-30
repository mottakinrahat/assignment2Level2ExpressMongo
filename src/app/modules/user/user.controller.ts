import { UserValidation } from "./user.validation";
import { Request, Response } from "express";
import { UserServices } from "./user.service";

import { TOrders, TUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const user:TUser = req.body;
    //data validation
    const zodParseData = UserValidation.userValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserAllFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const updateUserData = req.body;
    const result = await UserServices.updateSingleUserFromDB(
      userId,
      updateUserData
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const deleteSingleUserFromDB = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const result = await UserServices.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const updateUserData: TOrders = req.body;
    const result = await UserServices.createOrderFromDB(userId, updateUserData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Orders not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const result = await UserServices.getSingleOrder(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Orders not found",
      error: {
        code: 404,
        description: error.message || "can not get the order data",
      },
    });
  }
};
const getSumPrice = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.userId;
    const result = await UserServices.getTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Orders not found",
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUserFromDB,
  createOrders,
  getSingleOrder,
  getSumPrice,
};
