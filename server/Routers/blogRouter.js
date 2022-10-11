import express from "express";
import blog from "../models/blogModel.js";

const blogRouter = express.Router();

// create blog
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

// all blog
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

// user blogs
blogRouter.get("/user-blogs/:id", async (req, res) => {
  const id = req.params.id;
  blog
    .find({ blogAuthor: id })
    .sort({ createdDate: -1 })
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Veri bulunamadı" });
    });
});

// blog update
blogRouter.post("/blog-update/:id", (req, res) => {
  const id = req.params.id;
  const { title, explanation, text } = req.body;
  blog
    .findByIdAndUpdate(id, { title, explanation, text })
    .then((data) => {
      res.status(200).json({ message: "Güncelleme başarılı" });
    })
    .catch((err) => {
      return res.status(200).json({ message: "Gönderi düzenlenemedi" });
    });
});

// blog remove
blogRouter.get("/blog-delete/:id", (req, res) => {
  const id = req.params.id;
  blog
    .findByIdAndRemove(id)
    .then((data) => {
      res.status(200).json({ message: "Gönderi silindi" });
    })
    .catch((err) => {
      return res.status(200).json({ message: "Gönderi silinemedi" });
    });
});

export default blogRouter;
