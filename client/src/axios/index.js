import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});

// auth
export const login = async (formData) => await HTTP.post("/users/signin", formData);
export const register = async (formData) => await HTTP.post("/users/signup", formData);
export const userControl = async (userId) =>
  await HTTP.post("/users/usercontrol", userId);

export const getAllData = async () => await HTTP.get("/blogs/all-blogs");
export const createPost = async (formData) =>
  await HTTP.post("/blogs/create-blog", formData);

export const getUserData = async (id) => await HTTP.get(`/blogs/user-blogs/${id}`);
