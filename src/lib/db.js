import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
    console.log("Conectado ao banco de dados");
});

pool.on("error", (err, client) => {
    console.error("Erro inesperado no pool de conexões:", err);
    setTimeout(() => {
        console.log("Tentando reconectar ao banco...");
        client.release();
    }, 5000);
});

export default pool;
