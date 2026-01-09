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
router.get("/", async (req, res) => {
    const endpoint = "GET - /api/v1/users";
    const metadata = metaData(req);
    try {    
        res.status(200).json({
            message: "Users obtained successfully",
            endpoint,
            data: (users || []),
            metadata,
        });
    } catch (err) {
        res.status(500).json({ 
            message: "Server Error",
            endpoint,
            metadata,
            error: err,
        });
    }
});
/* GET USER BY userId */
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const endpoint = "GET - /api/v1/users/:userId";
    const metadata = metaData(req);
    try {    
        const user = users?.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ 
                message,
                error: "User not found",
                metadata,
            });
        }
        res.status(200).json({
            message: `User '${user.id}' data obtained successfully`,
            endpoint,
            id: userId,
            data: (user || []),
            metadata,
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Server Error",
            endpoint,
            metadata,
            error: err,
        });
    }
});
/* CREATE USER [user: {}] */
router.post("/", async (req, res) => {
    const endpoint = "POST - /api/v1/users";
    const metadata = metaData(req);
    try {    
        const newUser = {
            id: Date.now().toString(),
            ...req.body
        };
        users.push(newUser);
        writeData({ users });
        res.status(201).json({
            message: `User '${newUser.id}' created successfully`,
            endpoint,
            data: (users || []),
            metadata,
        })    
    } catch (err) {
        res.status(500).json({ 
            message: "Server Error",
            endpoint,
            metadata,
            error: err,
        });
    }
});
/* EDIT USER BY userId */
router.put("/:userId", async (req, res) => {
    const endpoint = "PUT - /api/v1/users/:userId";
    const metadata = metaData(req);
    const { userId } = req.params;
    try {
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
            id: userId,
            metadata,
            error: err,
        });
    }
});
/* DELETE USER BY userId */
router.delete("/:userId", async (req, res) => {
    const endpoint = "DELETE - /api/v1/users/:userId";
    const metadata = metaData(req);
    const { userId } = req.params;
    try {    
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
            error: err,
        });
    }
});


export default router;