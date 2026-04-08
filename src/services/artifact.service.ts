import { Artifact } from "../models/Artifact";
import {
    getAllArtifacts,
    getArtifactById,
    createArtifact,
    updateArtifactById,
    deleteArtifactById,
    getArtifactsByOwner,
    getArtifactsByType
} from "../repositories/artifact.repository";

export async function fetchArtifacts(): Promise<Artifact[]> {
    return await getAllArtifacts();
}

export async function fetchArtifactById(id: string): Promise<Artifact> {
    const artifact = await getArtifactById(id);

    if (!artifact) {
        throw new Error("Artifact not found");
    }

    return artifact;
}

export async function addArtifact(
    name: string,
    description: string,
    type: string,
    owner?: string
): Promise<Artifact> {
    if (!name || !description || !type) {
        throw new Error("Missing required properties");
    }

    return await createArtifact(name, description, type, owner);
}

export async function modifyArtifact(
    id: string,
    updatedData: Partial<Artifact>
): Promise<Artifact> {
    const updatedArtifact = await updateArtifactById(id, updatedData);

    if (!updatedArtifact) {
        throw new Error("Artifact not found");
    }

    return updatedArtifact;
}

export async function removeArtifact(id: string): Promise<Artifact> {
    const deletedArtifact = await deleteArtifactById(id);

    if (!deletedArtifact) {
        throw new Error("Artifact not found");
    }

    return deletedArtifact;
}

export async function fetchArtifactsByOwner(ownerId: string): Promise<Artifact[]> {
    return await getArtifactsByOwner(ownerId);
}

export async function fetchArtifactsByType(type: string): Promise<Artifact[]> {
    return await getArtifactsByType(type);
}
