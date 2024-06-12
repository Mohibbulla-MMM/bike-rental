import express from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

app.use(cors());
app.use(express.json());

// all module routers
app.use("/api", router);

app.get("/", async (req, res) => {
  res.send("Bike rental service Server ");
});

export default app;
