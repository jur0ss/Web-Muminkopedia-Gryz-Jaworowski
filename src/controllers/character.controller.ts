import { Request, Response } from "express";
import {
    fetchCharacters,
    addCharacter,
    removeCharacter
} from "../services/character.service";

import {
    updateCharacterById,
    deleteCharacterById
} from "../repositories/character.repository";

import { Character } from "../models/Character";


export async function getCharacters(req: Request, res: Response): Promise<void> {
    try {
        const characters = await fetchCharacters();
        res.status(200).json(characters);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}



export async function postCharacter(req: Request, res: Response): Promise<void> {
    try {
        const { name, description, species, sleepingWinter, bestFriend } = req.body;

        const newCharacter = await addCharacter(
            name,
            description,
            species,
            sleepingWinter,
            bestFriend
        );

        res.status(200).json(newCharacter);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: errorMessage });
    }
}



export async function putCharacter(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;
        const updatedData = req.body;

        const updatedCharacter = await updateCharacterById(id, updatedData);

        res.status(200).json(updatedCharacter);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";

        if (errorMessage === "Character not found") {
            res.status(404).json({ error: errorMessage });
        } else {
            res.status(500).json({ error: "Character not updated" });
        }
    }
}


export async function deleteCharacter(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;
        const deletedCharacter = await removeCharacter
    }