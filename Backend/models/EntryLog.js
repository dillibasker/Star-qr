import mongoose from "mongoose";

const entryLogSchema = new mongoose.Schema({
  employeeId: String,
  company: String,
  entryTime: {
    type: Date,
    default: Date.now
  },
  gate: String
});

export default mongoose.model("EntryLog", entryLogSchema);
