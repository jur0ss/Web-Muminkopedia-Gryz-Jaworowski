import mongoose, { Schema, Document } from "mongoose";

export interface Artifact extends Document {
    name: string;
    description: string;
    type: string;
    owner?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ArtifactSchema = new Schema<Artifact>({
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
    type: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Character",
        required: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Artifact>("Artifact", ArtifactSchema);
