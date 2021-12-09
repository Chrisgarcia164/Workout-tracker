const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send(index.html);
});

app.listen(PORT, () => {
  console.log(`http://localhost:3000`);
});
