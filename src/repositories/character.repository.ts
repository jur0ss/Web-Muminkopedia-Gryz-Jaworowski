import CharacterModel, { Character } from "../models/Character";

export async function getAllCharacters(): Promise<Character[]> {
    return CharacterModel.find().populate("bestFriend");
}

export async function createCharacter(
    name: string,
    description: string,
    species: string,
    sleepingWinter: boolean,
    bestFriend?: string
): Promise<Character> {

    const newCharacter = new CharacterModel({
        name,
        description,
        species,
        sleepingWinter,
        bestFriend: bestFriend || null
    });

    return newCharacter.save();
}

export async function updateCharacterById(
    id: string,
    updatedData: Partial<Character>
): Promise<Character | null> {

    return CharacterModel.findByIdAndUpdate(
        id,
        updatedData,
        { returnDocument: "after" }
    ).populate("bestFriend");
}

export async function deleteCharacterById(id: string): Promise<Character | null> {
    return CharacterModel.findByIdAndDelete(id);
}
