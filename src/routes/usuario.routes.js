import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/usuario.controller.js";
import { verifyToken } from "../utils/authMiddleware.js";

const router = Router();

//EndPoints
router
    .get('/usuarios', verifyToken, getUsers)
    .get('/usuarios/:id', verifyToken, getUserById)
    .post('/usuarios', createUser)
    .patch('/usuarios/:id', verifyToken, updateUser)
    .delete('/usuarios/:id', verifyToken, deleteUser)

export default router;