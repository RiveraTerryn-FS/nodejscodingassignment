import express from "express";
import dotenv from "dotenv";
import users from "./app/routes/user.js";
import { readData } from "./app/helpers/file.js";
// ------------------ SERVER CONNECTION -----------------
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// ----------------------- ROUTES -----------------------
app.get(["/", "/api", "/api/v1"], (req, res) => {
    res.json({ message: "API up and running", readData  });
});
app.use(`/api/v1/users`, users);
// -------------------- SERVER START --------------------
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
