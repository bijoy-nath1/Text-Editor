import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userGoogleId: { type: String, required: true, unique: true },
  drafts: { type: Array, required: false },
});

const User = mongoose.model("User", userSchema);
export default User;
