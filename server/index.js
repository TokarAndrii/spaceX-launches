const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema.js");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
const PORT = process.env.port || 3003;

app.listen(PORT, () => console.log(`app started at port - ${PORT}`));
