import axios from "axios";

const HTTP = axios.create({
   baseURL: "http://localhost:5000",
});

// user login
export const login = async (formData) => await HTTP.post("/users/signin", formData);

// user register
export const register = async (formData) => await HTTP.post("/users/signup", formData);

// user logincontrol
export const userControl = async (userId) =>
   await HTTP.post("/users/usercontrol", userId);

// all blog
export const getAllData = async () => await HTTP.get("/blogs/all-blogs");

// blog create
export const createPost = async (formData) =>
   await HTTP.post("/blogs/create-blog", formData);

// all user blog
export const getUserData = async (id) => await HTTP.get(`/blogs/user-blogs/${id}`);

// blog update
export const blogUpdate = async (id, data) =>
   await HTTP.post(`/blogs/blog-update/${id}`, data);

// blog remove
export const blogRemove = async (id, data) => await HTTP.get(`/blogs/blog-delete/${id}`);
