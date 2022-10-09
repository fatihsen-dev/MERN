import mongoose from "mongoose";

const blogschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  blogAuthor: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogschema);
