const mongoose = require("mongoose");

const Schema = mongoose.schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [],
});
