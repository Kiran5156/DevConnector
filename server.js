const express = require("express");
const app = express();
const connectDB = require("./config/db");
const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const auth = require("./routes/api/auth");

//connecting to mongodb
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/users", user);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
