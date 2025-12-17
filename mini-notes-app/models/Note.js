import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    content: { type: String, required: true, maxLength: 500 },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// noteSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const note = mongoose.model("Note", noteSchema);

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
