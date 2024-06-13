import { Router } from "express";
import { UserRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.router";
import { BikeRouter } from "../module/bike/bike.router";
import { BookingRouter } from "../module/booking/booking.router";

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
  {
    path: "/bikes",
    route: BikeRouter,
  },
  {
    path: "/rentals",
    route: BookingRouter,
  },
];

modulesRoutes.forEach((element) => {
  router.use(element.path, element.route);
});

export default router;
