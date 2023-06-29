const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

const PROFILES = ["Soapy", "Strawberry"];

router.post("/checkin", async (req, res) => {
  const { name } = req.body;
  if (!name || !PROFILES.includes(name)) {
    return res.status(400).json({ message: "Invalid profile name" });
  }

  try {
    const now = new Date();
    const user = await User.findOne({ name });

    let streak = 1;

    if (user && user.checkIns.length > 0) {
      const last = user.checkIns[user.checkIns.length - 1];
      const hoursSince = (now - new Date(last.date)) / (1000 * 60 * 60);

      if (hoursSince < 1) {
        return res.json({ name, streak: last.streak, lastCheckin: last.date });
      } else if (hoursSince <= 48) {
        streak = last.streak + 1;
      }
      // else > 48h: streak stays 1 (reset)
    }

    await User.findOneAndUpdate(
      { name },
      {
        $push: {
          checkIns: {
            $each: [{ date: now, streak }],
            $slice: -1,
          },
        },
      },
      { upsert: true }
    );

    res.json({ name, streak, lastCheckin: now });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/streaks", async (req, res) => {
  try {
    const users = await User.find({ name: { $in: PROFILES } });

    const result = {};
    for (const profile of PROFILES) {
      const user = users.find((u) => u.name === profile);
      if (user && user.checkIns.length > 0) {
        const last = user.checkIns[user.checkIns.length - 1];
        result[profile] = { streak: last.streak, lastCheckin: last.date };
      } else {
        result[profile] = { streak: 0, lastCheckin: null };
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
