import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  company: String,
  role: String,
  status: {
    type: String,
    default: "active"
  }
});

export default mongoose.model("Employee", employeeSchema);
