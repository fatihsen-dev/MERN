import express from "express";
import blog from "../models/blogModel.js";

const blogRouter = express.Router();

blogRouter.post("/create-blog", async (req, res) => {
  try {
    console.log(req.body);
    const { title, explanation, text, blogAuthor } = req.body;
    await blog.create({
      title: title,
      explanation: explanation,
      text: text,
      blogAuthor: blogAuthor,
    });

    return res.status(200).json({ message: "Blog oluşturuldu" });
  } catch (error) {
    return res.status(400).json({ message: "Blog Oluşturulamadı" });
  }
});

blogRouter.get("/all-blogs", (req, res) => {
  blog
    .find()
    .sort({ createdDate: -1 })
    .then((data) => {
      return res.status(200).json({ blogs: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});

blogRouter.use("/blog-details", async (req, res) => {
  blog
    .findById(req.body.id)
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});
blogRouter.get("/user-blogs/:id", async (req, res) => {
  const id = req.params.id;
  blog
    .find({ blogAuthor: id })
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});

export default blogRouter;
