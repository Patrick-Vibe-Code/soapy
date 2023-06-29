const Event = require("../models/EventModel");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  const { eventName, memos, addedBy, action, status = "not_started", changedBy } = req.body;

  const event = new Event({
    eventName,
    memos,
    addedBy,
    action,
    status,
    statusHistory: [{ status, changedBy: changedBy || addedBy, changedAt: new Date() }],
  });

  try {
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventName, action, status, addedBy, memos, changedBy } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const update = { eventName, action, addedBy, memos };
    if (status) update.status = status;

    if (status && status !== event.status) {
      update.$push = {
        statusHistory: { status, changedBy, changedAt: new Date() },
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
};
