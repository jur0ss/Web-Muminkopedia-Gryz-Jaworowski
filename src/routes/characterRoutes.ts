import express, { Request, Response } from "express";
import CharacterModel, { Character } from "../models/Character";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    try {
        const characters = await CharacterModel.find().populate("bestFriend");
        res.json(characters);
    } catch (err) {
        res.status(500).json({
            error: "Nie udało się pobrać postaci",
            details: err,
        });
    }
});


router.get("/:id", async (req: Request, res: Response) => {
    try {
        const character = await CharacterModel.findById(req.params.id).populate("bestFriend");

        if (!character) {
            return res.status(404).json({ error: "Nie znaleziono postaci" });
        }

        res.json(character);
    } catch (err) {
        res.status(500).json({
            error: "Błąd podczas pobierania postaci",
            details: err,
        });
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, description, species, sleepingWinter, bestFriend } = req.body;

        const newCharacter = new CharacterModel({
            name,
            description,
            species,
            sleepingWinter,
            bestFriend: bestFriend || null,
        });

        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(500).json({
            error: "Nie udało się dodać postaci",
            details: err,
        });
    }
});


router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updated = await CharacterModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("bestFriend");

        if (!updated) {
            return res.status(404).json({ error: "Nie znaleziono postaci" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({
            error: "Nie udało się zaktualizować postaci",
            details: err,
        });
    }
});


router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deleted = await CharacterModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Nie znaleziono postaci" });
        }

        res.json({ message: "Usunięto postać", deleted });
    } catch (err) {
        res.status(500).json({
            error: "Nie udało się usunąć postaci",
            details: err,
        });
    }
});

export default router;
