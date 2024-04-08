import express, { Request, Response } from "express";
import {
  createGroup,
  getGroupData,
  getAllUsersInGroup,
  modifyGroup,
  removeUsersFromGroup,
  addUsersToGroup,
  getAllGroups,
  modifyAllGroups,
  deleteGroup,
} from "../controllers/groupController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.get("/all", getAllGroups);

router.post("/", createGroup);

router.delete("/:groupId", deleteGroup);

router.get("/:id", getGroupData);

router.get("/:groupId/users", getAllUsersInGroup);

router.patch("/", modifyAllGroups);

router.patch("/:groupId/modify/:userId", modifyGroup);

router.patch("/:groupId/removeUsers", removeUsersFromGroup);

router.patch("/:groupId/addUsers", addUsersToGroup);

export default router;
