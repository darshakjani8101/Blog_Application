import express from "express";
import { config } from "dotenv";
import { connectToDatabase } from "./utils/connection";

//dotenv config
config();

const app = express();

//connections and listeners
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on PORT ${PORT} & Connected to Mongodb ✌️`)
    );
  })
  .catch((err) => console.log(err));
