const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema({
  text: String,
  writtenBy: String,
});

const StatusHistorySchema = new mongoose.Schema({
  status: String,
  changedBy: String,
  changedAt: { type: Date, default: Date.now },
});

const EventSchema = new mongoose.Schema({
  addedBy: String,
  eventName: String,
  action: String,
  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed", "wont_do"],
    default: "not_started",
  },
  statusHistory: [StatusHistorySchema],
  memos: MemoSchema,
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
