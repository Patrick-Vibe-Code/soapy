const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const eventRouter = require("./routes/eventRoute");
const checkPassword = require("./routes/checkPassword");
const authMiddleware = require("./middleware/auth");
const checkinRouter = require("./routes/checkinRoute");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Could not connect to MongoDB Atlas"));

app.post("/api/check-password", checkPassword);
app.use("/api", authMiddleware, eventRouter);
app.use("/api", authMiddleware, checkinRouter);

const clientBuild = path.join(__dirname, "../client/build");
app.use(express.static(clientBuild));
app.get("*", (req, res) => res.sendFile(path.join(clientBuild, "index.html")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
