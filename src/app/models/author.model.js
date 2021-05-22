import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: { type: String, maxLength: 50 },
  lastName: { type: String, maxLength: 50 },
  username: { type: String, maxLength: 20 },
  password: { type: String, maxLength: 20 },
  coin: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AuthorModel = mongoose.model("authors", authorSchema);

export {
  AuthorModel,
}

