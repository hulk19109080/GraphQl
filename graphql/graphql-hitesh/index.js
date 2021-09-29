const express = require("express");
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = process.env.PORT || 4000;

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root,
  })
);

app.listen(port, () => {
  console.log(`server is running at ${port} port`);
});
