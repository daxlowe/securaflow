import express, { Request, Response } from "express";
import {
  createGroup,
  getGroupData,
  getAllUsersInGroup,
  modifyGroup,
  removeUsersFromGroup,
} from "../controllers/groupController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/create", createGroup);

router.get("/:id", getGroupData);

router.get("/:groupId/users", getAllUsersInGroup);

router.patch("/:groupId/modify/:userId", modifyGroup)

router.patch("/:groupId/removeUsers", removeUsersFromGroup);

export default router;
