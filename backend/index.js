import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url"; // Required to define __dirname in ES modules

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://aspire-galaxy.vercel.app',
    credentials: true,
};

app.use(cors(corsOptions));

// Define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, '../frontend/')));  // Serving from 'dist' now

// Catch-all to serve index.html (for React's client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));  // Serving 'dist' folder
});

// Connect to the database and start the server
app.listen(PORT, async () => {
    await connectDB(); // Wait for the DB connection before starting the server
    console.log(`Server running at http://localhost:${PORT}`);
});
