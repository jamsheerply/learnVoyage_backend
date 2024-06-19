import { Router } from "express";
import { createCategoryController } from "../controllers/category/create";
import { readAllCategoryController } from "../controllers/category/readAll";
import { readByIdCategoryController } from "../controllers/category/readById";
import { updateCategoryController } from "../controllers/category/update";

const router = Router();

router.post("/create", createCategoryController);
router.get("/read", readAllCategoryController);
router.get("/read/:id", readByIdCategoryController);
router.patch("/update", updateCategoryController);
export default router;
