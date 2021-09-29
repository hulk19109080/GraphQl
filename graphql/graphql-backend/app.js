const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

//express-graphql helps us to understand the
//relationship between the server and graphql
//we will have a single endpoint on which
// we will send the query of us
//graphqlHTTP will handle all query and demand a schema
//schema is just format of our data
//that how the structure of our data will be
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MONGO_URL;

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database is connected");
  }
);
/// ***********************IMPORTANT POINT *****************USE CORSat toppest

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    //helps in using graphql tool of web browser for interaction
  })
);
app.listen(port, () => console.log("server is running"));
