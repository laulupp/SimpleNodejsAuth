let express = require("express");
let app = express();

let port = 80;

app.get("/", (req, res) => {
  res.render("views/index.ejs");
});

app.listen(port, () => {
  console.log("Started on port " + port);
});
