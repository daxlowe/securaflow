import express, { Request, Response } from "express";
import {
  createGroup,
  getGroupData,
  getAllUsersInGroup,
} from "../controllers/groupController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/create", createGroup);

router.get("/:id", getGroupData);

router.get("/:groupId/users", getAllUsersInGroup);

export default router;
