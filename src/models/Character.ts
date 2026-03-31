import mongoose, { Schema, Document } from "mongoose";

export interface Character extends Document {
    name: string;
    description: string;
    species: string;
    sleepingWinter: boolean;
    bestFriend?: mongoose.Types.ObjectId;
}

const CharacterSchema = new Schema<Character>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    species: {
        type: String,
        required: true,
        trim: true,
    },
    sleepingWinter: {
        type: Boolean,
        required: true,
    },
    bestFriend: {
        type: Schema.Types.ObjectId,
        ref: "Character", // referencja do tej samej kolekcji
        required: false,
    },
});

export default mongoose.model<Character>("Character", CharacterSchema);
