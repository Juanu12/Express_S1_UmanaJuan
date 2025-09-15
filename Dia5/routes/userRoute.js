import { Router } from "express";

export function buildUserRouter(controller) {
    const router = Router();

    router.get("/", controller.list);
    router.get("/:id", controller.get);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}