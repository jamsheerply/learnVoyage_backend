import { Router } from "express";
import { createCategoryController } from "../controllers/category/create";
import { readAllCategoryController } from "../controllers/category/readAll";
import { readByIdCategoryController } from "../controllers/category/readById";
import { updateCategoryController } from "../controllers/category/update";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";

const router = Router();

router.post("/create", jwtMiddleware, createCategoryController);
router.get("/read", jwtMiddleware, readAllCategoryController);
router.get("/read/:id", jwtMiddleware, readByIdCategoryController);
router.patch("/update", jwtMiddleware, updateCategoryController);
export default router;
