import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = express.Router();

// localhost:5000/users/signup 'a yapılan post isteği
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, password, phoneNumber, email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
      });

      return res.status(201).json(createdUser);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// localhost:5000/users/signin post request
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Wrong Password" });
      } else {
        return res.status(200).json({ user, message: "Authentication successful" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
