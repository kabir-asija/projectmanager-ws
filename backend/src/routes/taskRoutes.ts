import { Router } from "express";
import { getTasks, createTask } from "../controllers/taskController.ts"
const router = Router();

router.get("/", getTasks);
router.post("/", createTask);

export default router;
