const express = require("express");
const App = express();
const cors = require("cors");

App.use(cors());

App.use(express.json());
App.get("/", (req, res) => {
  res.send("hello from the server");
});

App.post("/api/state/cache", (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
const PORT = 4000;
App.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
