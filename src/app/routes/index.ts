import { Router } from "express";
import { UserRouter } from "../module/user/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRouter,
  },
];

modulesRoutes.forEach((element) => {
  router.use(element.path, element.route);
});


export default router;
