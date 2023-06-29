const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const eventRouter = require("./routes/eventRoute");
const checkPassword = require("./routes/checkPassword");
const authMiddleware = require("./middleware/auth");
const checkinRouter = require("./routes/checkinRoute");
const Event = require("./models/EventModel");

const PORT = process.env.PORT || 8080;

const seed = async () => {
  const count = await Event.countDocuments();
  if (count > 0) return;
  await Event.insertMany([
    {
      addedBy: "Soapy",
      eventName: "去海边玩",
      action: "举起猪脚画了个大饼说",
      status: "not_started",
      statusHistory: [{ status: "not_started", changedBy: "Soapy", changedAt: new Date() }],
      memos: { writtenBy: "Strawberry", text: "记得带防晒霜！" },
    },
    {
      addedBy: "Strawberry",
      eventName: "一起做饭",
      action: "觉得可能有可能",
      status: "in_progress",
      statusHistory: [
        { status: "not_started", changedBy: "Strawberry", changedAt: new Date(Date.now() - 86400000) },
        { status: "in_progress", changedBy: "Soapy", changedAt: new Date() },
      ],
      memos: { writtenBy: "Soapy", text: "" },
    },
    {
      addedBy: "Soapy",
      eventName: "买新沙发",
      action: "说不是画饼一定可以",
      status: "completed",
      statusHistory: [
        { status: "not_started", changedBy: "Soapy", changedAt: new Date(Date.now() - 172800000) },
        { status: "completed", changedBy: "Strawberry", changedAt: new Date() },
      ],
      memos: { writtenBy: "Strawberry", text: "终于买了！" },
    },
  ]);
  console.log("Seeded local DB with sample events");
};

const start = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);
  console.log("Connected to in-memory MongoDB");

  await seed();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/api/check-password", checkPassword);
  app.use("/api", authMiddleware, eventRouter);
  app.use("/api", authMiddleware, checkinRouter);

  app.listen(PORT, () => {
    console.log(`Dev server running on port ${PORT}`);
    console.log(`Password: ${process.env.PASSWORD || "(not set)"}`);
  });
};

start().catch((err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});
