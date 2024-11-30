"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
        // Handle connection events
        mongoose_1.default.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};
exports.default = connectDB;
