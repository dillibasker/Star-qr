import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import entryRoutes from "./routes/entryRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", entryRoutes);
app.use("/api", employeeRoutes);


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
