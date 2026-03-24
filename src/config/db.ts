import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const MONGODB_URI = process.env.MONGO_URI;

    // Bezpieczne sprawdzenie, czy zmienna środowiskowa istnieje
    if (!MONGODB_URI) {
        throw new Error("Brak zdefiniowanej zmiennej MONGO_URI w pliku .env!");
    }

    // Pozbywamy się try/catch tutaj. Jeśli mongoose.connect rzuci błędem,
    // poleci on wyżej, gdzie obsłużymy go w głównym pliku.
    await mongoose.connect(MONGODB_URI);
    console.log("👍 Pomyślnie połączono z MongoDB");
};

export default connectDB;
