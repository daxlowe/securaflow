import express, { Request, Response, Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
// Import other necessary modules, like controllers or middleware
import {
  loginUser,
  signupUser,
  updateUser,
  getUserData,
  getUserGroups,
  deleteUser,
  getAllUsers,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.use(requireAuth);

router.get("/", getUserData);

router.patch("/", updateUser);

router.get("/groups", getUserGroups);

router.get("/all", getAllUsers);

router.delete("/:userId", deleteUser);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;
