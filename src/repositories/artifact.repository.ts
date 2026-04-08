import ArtifactModel, { Artifact } from "../models/Artifact";

export async function getAllArtifacts(): Promise<Artifact[]> {
    return ArtifactModel.find().populate("owner");
}

export async function getArtifactById(id: string): Promise<Artifact | null> {
    return ArtifactModel.findById(id).populate("owner");
}

export async function createArtifact(
    name: string,
    description: string,
    type: string,
    owner?: string
): Promise<Artifact> {
    const newArtifact = new ArtifactModel({
        name,
        description,
        type,
        owner: owner || null,
    });

    return newArtifact.save();
}

export async function updateArtifactById(
    id: string,
    updatedData: Partial<Artifact>
): Promise<Artifact | null> {
    return ArtifactModel.findByIdAndUpdate(
        id,
        updatedData,
        { returnDocument: "after" }
    ).populate("owner");
}

export async function deleteArtifactById(id: string): Promise<Artifact | null> {
    return ArtifactModel.findByIdAndDelete(id);
}

export async function getArtifactsByOwner(ownerId: string): Promise<Artifact[]> {
    return ArtifactModel.find({ owner: ownerId }).populate("owner");
}

export async function getArtifactsByType(type: string): Promise<Artifact[]> {
    return ArtifactModel.find({ type }).populate("owner");
}
