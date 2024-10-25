import postgres from "postgres";

export const db = postgres(process.env.SECRET_XATA_PG_ENDPOINT!);
