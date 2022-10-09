import express from "express";
import blog from "../models/blogModel.js";

const blogRouter = express.Router();

blogRouter.post("/create-blog", async (req, res) => {
  console.log(req.body);

  const { title, explanation, text, blogAuthor } = req.body;

  try {
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
blogRouter.post("/all-blogs", (req, res) => {
  blog
    .find()
    .then((data) => {
      return res.status(200).json({ Blogs: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});
blogRouter.post("/blog-details", async (req, res) => {
  blog
    .findById(req.body.id)
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});

blogRouter.post("/user-blogs", async (req, res) => {
  blog
    .find({ blogAuthor: req.body.id })
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});

export default blogRouter;
