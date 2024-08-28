import { Router } from "express";
import { createCategoryController } from "../controllers/category/create";
import { readAllCategoryController } from "../controllers/category/readAll";
import { readByIdCategoryController } from "../controllers/category/readById";
import { updateCategoryController } from "../controllers/category/update";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import roleMiddleware from "../../_lib/roleMiddleware";

const router = Router();

router.post(
  "/create",
  jwtMiddleware,
  roleMiddleware("admin"),
  createCategoryController
);
router.get("/read", readAllCategoryController);
router.get(
  "/read/:id",
  jwtMiddleware,
  roleMiddleware("admin"),
  readByIdCategoryController
);
router.patch(
  "/update",
  jwtMiddleware,
  roleMiddleware("admin"),
  updateCategoryController
);
export default router;
