import express from "express";
import commandController from "../controllers/commands.controller"
const router = express.Router()

// Creating endpoint in path {yoursite}/commands/test
router.post('/test', (req, res) => {
    commandController.addCommand(req, res);
});

export default router;