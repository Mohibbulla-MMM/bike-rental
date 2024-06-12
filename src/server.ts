import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    const url = config.db_url as string;
    const port = config.port;
    await mongoose.connect(url, { dbName: "Bike rental service" });
    app.listen(port, () => {
      console.log(`Bike rental service server running on port: ${port}`);
    });
  } catch (err) {
    console.log(`server err: ${err}`);
  }
}
main();
