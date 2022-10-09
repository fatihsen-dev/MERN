import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "İsminiz minimum 3 karakter olmalıdır"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Şifreniz minimum 8 karakter olmalıdır"],
  },
  userType: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
