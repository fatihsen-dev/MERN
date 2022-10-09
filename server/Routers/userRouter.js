import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const userRouter = express.Router();

// localhost:5000/users/signup 'a yapılan post isteği
userRouter.post("/signup", async (req, res) => {
  try {
    const { fullname, password, phoneNumber, email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Zaten böyle bir kullanıcımız var" });
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
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Şifre yanlış" });
      } else {
        return res.status(200).json({ user, message: "Veri alındı" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
userRouter.post("/usercontrol", async (req, res) => {
  if (req.body?.key) {
    const { key } = req.body;

    User.findOne({ _id: key }, (err, data) => {
      if (err) {
        return res.status(400).json({ message: "Kullanıcı bulunamadı" });
      }
      return res.json(data);
    });
  } else {
    return res.status(400).json({ message: "Key alınmadı" });
  }
});

export default userRouter;
