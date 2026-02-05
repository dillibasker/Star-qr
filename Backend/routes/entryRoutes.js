import express from "express";
import Employee from "../models/Employee.js";
import EntryLog from "../models/EntryLog.js";

const router = express.Router();

router.post("/scan-entry", async (req, res) => {
  try {
    const { employeeId, gate } = req.body;

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const entry = new EntryLog({
      employeeId,
      company: employee.company,
      gate
    });

    await entry.save();

    res.json({
      name: employee.name,
      company: employee.company,
      role: employee.role,
      entryTime: new Date().toLocaleTimeString()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
