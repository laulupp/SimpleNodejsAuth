let express = require("express");
let app = express();

let port = 80;

app.listen(port, () => {
  console.log("Started on port " + port);
});
