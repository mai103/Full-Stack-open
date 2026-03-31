import {Router} from "express"
import {getAllUsers, getUserById, createUser, updateUserByID, deleteUserByID} from "../controllers/users.js"

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserByID)
router.delete("/users/:id", deleteUserByID)

export default router;