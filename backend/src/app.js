import express from "express";
import cors from "cors";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import signRoutes from "./routes/signRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/sign", signRoutes);

export default app;
