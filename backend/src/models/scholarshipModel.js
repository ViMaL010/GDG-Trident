import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  scholarshipID: String,
  name: String,
  category: String, // Merit-Based or Skill-Based
  min10thMarks: Number,
  min12thMarks: Number,
  minCGPA: Number,
  minAIScore: Number,
  amount: Number,
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
export default Scholarship;
