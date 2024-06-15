import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
let server: Server;

async function main() {
  try {
    const url = config.db_url as string;
    const port = process.env?.PORT || config?.port;
    await mongoose.connect(url, { dbName: "Bike-rental-service" });

    // app listen
    server = app.listen(port, () => {
      console.log(`Bike rental service server running on port: ${port}`);
    });
  } catch (err) {
    console.log(`server err: ${err}`);
  }
}
main();

// unhandle rejection asynchronous code
process.on("unhandledRejection", () => {
  // console.log(!server);
  if (server) {
    // console.log(!server);
    server.close(() => {
      process.exit(1);
    });
  }
  console.log("⭕🐞⭕unhandledRejection is detected. server sutting down!");
  process.exit(1);
});

// uncaught exception synchronous code
process.on("uncaughtException", () => {
  console.log("⭕🐞⭕ uncaughtExeption is detected. server sutting down!");
  process.exit(1);
});
