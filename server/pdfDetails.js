import mongoose from "mongoose";

export const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    CourseCode: String,
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { collection: "PdfDetails" }
);

export default mongoose.model("PdfDetails", PdfDetailsSchema);