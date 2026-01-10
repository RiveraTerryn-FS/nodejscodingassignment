import express from "express";
const router = express.Router();
/* Import Read/Write helper */
import { readData, writeData } from "../helpers/file.js";
const data = readData();
/* Get or set users array */
let users = data.users || [];
/* Set metadata */
const metaData = (req) => {
    return {
        hostname: req.hostname,
        method: req.method,
    };
}
/* GET ALL USERS */
router.get("/", (req, res) => {
    const endpoint = "GET - /api/v1/users";
    const metadata = metaData(req);
    try {
        if (!Array.isArray(users)) {
            throw new Error("Users data not loaded");
        }
        res.status(200).json({
            message: "Users obtained successfully",
            endpoint,
            data: users,
            metadata,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            endpoint,
            metadata,
            error: err.message,
        });
    }
});
/* GET USER BY userId */
router.get("/:userId", async (req, res) => {
    const endpoint = "GET - /api/v1/users/:userId";
    const metadata = metaData(req);
    try {
        if (!Array.isArray(users)) {
            throw new Error("Users data not loaded");
        }
        const { userId } = req.params;
        const user = users.find(u => (u.id) === (userId));
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                endpoint,
                metadata,
            });
        }
        res.status(200).json({
            message: `User '${user.id}' data obtained successfully`,
            endpoint,
            id: userId,
            data: user,
            metadata,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            endpoint,
            metadata,
            error: err.message,
        });
    }
});
/* CREATE USER [user: {}] */
router.post("/", (req, res) => {
    const endpoint = "POST - /api/v1/users";
    const metadata = metaData(req);
    try {
        if (!Array.isArray(users)) {
            throw new Error("Users data not loaded");
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body is required",
                endpoint,
                metadata,
            });
        }
        const newUser = {
            id: Date.now().toString(),
            ...req.body
        };
        users.push(newUser);
        writeData(users);
        res.status(201).json({
            message: `User '${newUser.id}' created successfully`,
            endpoint,
            data: newUser,
            metadata,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            endpoint,
            metadata,
            error: err.message,
        });
    }
});
/* EDIT USER BY userId */
router.put("/:userId", async (req, res) => {
    const endpoint = "PUT - /api/v1/users/:userId";
    const metadata = metaData(req);
    try {
        if (!Array.isArray(users)) {
            throw new Error("Users data not loaded");
        }
        const { userId } = req.params;
        const index = users?.findIndex(u => u.id === userId);
        if (index === -1) {
            return res.status(404).json({ 
                message: "User not found",
                endpoint,
                id: userId,
                metadata,
            });
        }
        users[index] = { ...users[index], ...req.body };
        writeData({ users });
        res.status(200).json({
            message: `User '${userId}' updated successfully`,
            endpoint,
            id: userId,
            data:  users[index],
            metadata,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            endpoint,
            metadata,
            error: err.message,
        });
    }
});
/* DELETE USER BY userId */
router.delete("/:userId", async (req, res) => {
    const endpoint = "DELETE - /api/v1/users/:userId";
    const metadata = metaData(req);
    try {
        if (!Array.isArray(users)) {
            throw new Error("Users data not loaded");
        }
        const { userId } = req.params;
        const user = users.find(u => (u.id) === (userId));
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                endpoint,
                metadata,
            });
        }
        users = users.filter(u => u.id !== userId);
        writeData({ users });
        res.status(200).json({
            message: `User '${userId}' deleted successfully`,
            endpoint,
            id: userId,
            data:  users,
            metadata,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            endpoint,
            metadata,
            error: err.message,
        });
    }
});
export default router;