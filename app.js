const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5500",
    ],
    credentials: true,
  }),
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/images", express.static("public/images"));

app.get("/", () => {
  console.log("hello");
});

const img = require("./routes/img");
app.use("/img", img);

const ch = require("./routes/chr");
app.use("/characters", ch);

const game = require("./routes/game");
app.use("/game", game);

const leaderboard = require("./routes/leaderboard");
app.use("/leaderboard", leaderboard);

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
