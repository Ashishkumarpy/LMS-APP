"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const db_1 = __importDefault(require("./utils/db"));
const socketServer_1 = require("./socketServer");
// Load environment variables first
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = [
    "PORT",
    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_SECRET_KEY",
];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}
// Initialize server
const server = http_1.default.createServer(app_1.app);
// Configure cloudinary
try {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET_KEY,
    });
    console.log("Cloudinary configured successfully");
}
catch (error) {
    console.error("Cloudinary configuration failed:", error);
    process.exit(1);
}
// Initialize socket server
try {
    (0, socketServer_1.initSocketServer)(server);
    console.log("Socket server initialized successfully");
}
catch (error) {
    console.error("Socket server initialization failed:", error);
    process.exit(1);
}
// Start server and connect to database
const startServer = async () => {
    try {
        // Connect to database first
        await (0, db_1.default)();
        console.log("Database connected successfully");
        // Then start the server
        const PORT = process.env.PORT || 8000;
        server.listen(PORT, () => {
            console.log(`Server is connected with port ${PORT}`);
        });
        // Error handling for the server
        server.on("error", (error) => {
            console.error("Server error:", error);
            process.exit(1);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
// Handle uncaught errors
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
// Start the server
startServer();
