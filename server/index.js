const express = require("express");
const path = require('path')
const app = express();
const cors = require('cors');
// Allow cross-origin
app.use(cors());
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = process.env.port || 3003;

app.listen(PORT, () => console.log(`app started at port - ${PORT}`));
