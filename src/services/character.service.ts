import { Character } from "../models/Character";
import {
    getAllCharacters,
    createCharacter,
    updateCharacterById,
    deleteCharacterById
} from "../repositories/character.repository";

export async function fetchCharacters(): Promise<Character[]> {
    return await getAllCharacters();
}

export async function addCharacter(
    name: string,
    description: string,
    species: string,
    sleepingWinter: boolean,
    bestFriend?: string
): Promise<Character> {

    if (!name || !description || !species || sleepingWinter === undefined) {
        throw new Error("Missing required property");
    }

    return await createCharacter(name, description, species, sleepingWinter, bestFriend);
}

export async function modifyCharacter(
    id: string,
    updatedData: Partial<Character>
): Promise<Character> {

    const updatedCharacter = await updateCharacterById(id, updatedData);

    if (!updatedCharacter) {
        throw new Error("Character not found");
    }

    return updatedCharacter;
}

export async function removeCharacter(id: string): Promise<Character> {
    const deletedCharacter = await deleteCharacterById(id);

    if (!deletedCharacter) {
        throw new Error("Character not found");
    }

    return deletedCharacter;
}
