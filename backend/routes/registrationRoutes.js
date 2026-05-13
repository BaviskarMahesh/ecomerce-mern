const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyRegistered = await Registration.findOne({ eventId: req.body.eventId, email: req.body.email });
    if (alreadyRegistered) return res.status(400).json({ message: "Email already registered for this event" });

    const reg = new Registration({ ...req.body, eventTitle: event.title });
    const saved = await reg.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const regs = await Registration.find().sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/event/:eventId", async (req, res) => {
  try {
    const regs = await Registration.find({ eventId: req.params.eventId });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
