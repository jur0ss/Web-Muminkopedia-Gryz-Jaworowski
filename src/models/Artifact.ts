import { Schema, model, Document, Types } from "mongoose";

export interface Artifact extends Document {
    name: string;
    description: string;
    type: string;
    owner: Types.ObjectId; // poprawne powiązanie z Character
}

const ArtifactSchema = new Schema<Artifact>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Character",
        required: true
    }
});

export default model<Artifact>("Artifact", ArtifactSchema);
