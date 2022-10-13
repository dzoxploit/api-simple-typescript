/** source/routes/posts.ts */
import express from "express";
import controller from "../controllers/summaries";
const router = express.Router();

router.get("/total-transactions", controller.getTotalTransactions);
router.get("/best-selling-item", controller.getBestSellingItem);
router.get("/best-selling-category", controller.getBestSellingCategory);
router.get("/get-rpc", controller.getRPC);
// router.get("/posts/:id", controller.getPost);
// router.put("/posts/:id", controller.updatePost);
// router.delete("/posts/:id", controller.deletePost);
// router.post("/posts", controller.addPost);

export = router;
