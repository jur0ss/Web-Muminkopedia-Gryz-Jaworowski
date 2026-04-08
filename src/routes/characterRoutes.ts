import express from "express";
import {
    getCharacters,
    postCharacter,
    putCharacter,
    deleteCharacter
} from "../controllers/character.controller";

const router = express.Router();

router.get("/", getCharacters);
router.post("/", postCharacter);
router.put("/:id", putCharacter);
router.delete("/:id", deleteCharacter);

export default router;
