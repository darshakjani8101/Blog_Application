import express from "express";
import { config } from "dotenv";
import { connectToDatabase } from "./utils/connection";
import { graphqlHTTP } from "express-graphql";
import schema from "./handlers/handlers";

//dotenv config
config();

const app = express();

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

//connections and listeners
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on PORT ${PORT} & Connected to Mongodb ✌️`)
    );
  })
  .catch((err) => console.log(err));
