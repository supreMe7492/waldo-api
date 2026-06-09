const express = require("express");

const app = express();

app.use("/images", express.static("public/images"));

app.get("/", () => {
  console.log("hello");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      code: status,
      message: err.message,
    },
  });
});
app.listen(3000, () => {
  console.log("whatsup");
});
