import { Request, Response } from "express";
import {
    fetchArtifacts,
    fetchArtifactById,
    addArtifact,
    modifyArtifact,
    removeArtifact,
    fetchArtifactsByOwner,
    fetchArtifactsByType
} from "../services/artifact.service";

export async function getArtifacts(req: Request, res: Response): Promise<void> {
    try {
        const artifacts = await fetchArtifacts();
        res.status(200).json(artifacts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch artifacts" });
    }
}

export async function getArtifact(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;
        const artifact = await fetchArtifactById(id);
        res.status(200).json(artifact);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";

        if (errorMessage === "Artifact not found") {
            res.status(404).json({ error: errorMessage });
        } else {
            res.status(500).json({ error: errorMessage });
        }
    }
}

export async function postArtifact(req: Request, res: Response): Promise<void> {
    try {
        const { name, description, type, owner } = req.body;

        const newArtifact = await addArtifact(name, description, type, owner);

        res.status(201).json(newArtifact);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ error: errorMessage });
    }
}

export async function putArtifact(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;
        const updatedData = req.body;

        const updatedArtifact = await modifyArtifact(id, updatedData);

        res.status(200).json(updatedArtifact);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";

        if (errorMessage === "Artifact not found") {
            res.status(404).json({ error: errorMessage });
        } else {
            res.status(400).json({ error: errorMessage });
        }
    }
}

export async function deleteArtifact(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string;

        const deletedArtifact = await removeArtifact(id);

        res.json({
            message: "Artefakt usunięty",
            artifact: deletedArtifact
        });
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");

        if (error.message === "Artifact not found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({
                error: `Nie udało się usunąć artefaktu: ${error.message}`
            });
        }
    }
}

export async function getArtifactsByOwnerController(req: Request, res: Response): Promise<void> {
    try {
        const ownerId = req.params.ownerId as string;
        const artifacts = await fetchArtifactsByOwner(ownerId);
        res.status(200).json(artifacts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch artifacts by owner" });
    }
}

export async function getArtifactsByTypeController(req: Request, res: Response): Promise<void> {
    try {
        const type = req.params.type as string;
        const artifacts = await fetchArtifactsByType(type);
        res.status(200).json(artifacts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch artifacts by type" });
    }
}
