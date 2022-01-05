const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const { Workout } = require("./models/workout.js");
require("dotenv").config();
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/deep-thoughts",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB works");
});

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.post("/api/workouts", ({ body }, res) => {
  const workout = new Workout(body);
  Workout.create(workout)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
// app.post("api/workouts/range");

app.listen(PORT, () => {
  console.log(`http://localhost:3000`);
});
