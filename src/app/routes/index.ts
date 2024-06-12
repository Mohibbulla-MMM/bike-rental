import { Router } from "express";
import { UserRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.router";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
];

modulesRoutes.forEach((element) => {
  router.use(element.path, element.route);
});

export default router;
