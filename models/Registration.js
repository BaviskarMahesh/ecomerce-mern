const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    eventTitle: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
