require("dotenv").config();

const jwt = require("jsonwebtoken");
const authenticatetoken = require("./utility");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const User = require("./models/usermode");
const Notes = require("./models/notesmodel");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

//SIGNUP
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Please enter username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const accesstoken = jwt.sign(
    { _id: newUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "36000m",
    }
  );

  return res.json({
    user: newUser,
    accesstoken,
    message: "User created succsesfully",
  });
});

//LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found! Go Signup" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      console.error("Error comparing passwords:", err);
      return res.status(500).json({ message: "Server Error" });
    }

    const accesstoken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "36000m" }
    );

    return res.json({
      user,
      accesstoken,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET USER
app.get("/user", authenticatetoken, async (req, res) => {
  const { _id } = req.user; // Ensure req.user has the _id field
  if (!_id) {
    return res.status(400).json({ message: "User ID not found in token" });
  }

  try {
    const isUser = await User.findById(_id);
    if (!isUser) {
      return res.status(400).json({ message: "User not found in database" });
    }
    return res.json({ user: isUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//ADD NOTE
app.post("/add-note", authenticatetoken, async (req, res) => {
  const { title, content, tags, hidden } = req.body;
  const { _id } = req.user;

  if (!title) {
    return res.status(400).json({ message: "Please enter title" });
  }
  if (!content) {
    return res.status(400).json({ message: "Please enter content" });
  }

  try {
    const note = await Notes.create({
      title,
      content,
      tags: tags || [],
      userId: _id,
      hidden,
    });
    await note.save();
    return res.json({
      note,
      message: "Note Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//EDIT NOTE
app.put("/edit-note/:noteId", authenticatetoken, async (req, res) => {
  // console.log("Params:", req.params);
  console.log("Body:", req.body);
  // console.log("User:", req.user);
  const noteId = req.params.noteId;
  const { title, content, tags, hidden } = req.body;

  try {
    const note = await Notes.findOne({ _id: noteId, userId: req.user._id });

    if (!note) {
      console.log("hi hi ih");
      return res.status(404).json({ message: "Note not found" });
    }
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (hidden !== undefined) {
      note.hidden = hidden;
    }
    await note.save();
    return res.json({
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//GET ALL NOTES
app.get("/get-all-notes", authenticatetoken, async (req, res) => {
  const { _id } = req.user;
  try {
    const notes = await Notes.find({ userId: _id });

    return res.json({
      notes,
      message: "All notes are here",
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

//GET SINGLE NOTE
app.get("/single-note/:noteId", authenticatetoken, async (req, res) => {
  const { noteId } = req.params;
  const { _id } = req.user;
  try {
    const note = await Notes.findOne({
      _id: noteId,
      userId: _id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json({
      note,
      message: "Note found bjp",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//DELETE NOTE
app.delete("/delete-note/:noteId", authenticatetoken, async (req, res) => {
  const noteId = req.params.noteId;
  const { _id } = req.user;
  try {
    const note = await Notes.findOneAndDelete({
      _id: noteId,
      userId: _id,
    });
    return res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//GET ALL USERS
app.get("/get-all-users", authenticatetoken, async (req, res) => {
  const { _id } = req.user;
  try {
    const users = await User.find({ _id: { $ne: _id } });
    return res.json({
      users,
      message: "All users are here",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//GET USER NOTES
app.get("/get-user-notes/:userID", authenticatetoken, async (req, res) => {
  const { userID } = req.params;
  try {
    const usernotes = await Notes.find({ userId: userID, hidden: false });
    return res.json({
      usernotes,
      message: "users notes",
    });
  } catch (error) {
    return res.status(400).json({ message: "error has occured" });
  }
});

app.get("/user/:userID", authenticatetoken, async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findOne({ userId: userID });
    return res.json({
      user,
      message: "user found",
    });
  } catch (error) {
    return res.status(400).json({ message: "error has occured" });
  }
});

app.listen(8000, () => {
  console.log("server running");
});

module.exports = app;
