import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app = express();

app.use(cors());
app.use(express.json());

// all module routers
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send("Bike rental service Server ");
};

app.get("/", test);

// global error handler
app.use(globalErrorHandler);
// api not found
app.use(notFound);

export default app;
