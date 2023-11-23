import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

//will call controller

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getSingleUser);

router.put("/:userId", UserController.updateSingleUser);

router.delete("/:userId", UserController.deleteSingleUserFromDB);
router.put("/api/users/:userId/orders", UserController.createOrders);
router.get("/api/users/:userId/orders", UserController.getSingleOrder)

export const userRoutes = router;
