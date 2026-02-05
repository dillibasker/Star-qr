import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

router.post("/add-employee", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
