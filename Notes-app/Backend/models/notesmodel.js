const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
  },
  tags: {
    type: [String],
    default: [],
  },
  hidden: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Notes", notesSchema);
