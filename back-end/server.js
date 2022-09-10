const express = require("express");
const App = express();

App.get("/", (req, res) => {
  res.send("hello from the server");
});
const PORT = 4000;
App.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
