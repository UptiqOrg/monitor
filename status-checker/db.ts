import postgres from "postgres";

export const db = postgres(process.env.SECRET_XATA_PG_ENDPOINT!, {
  connect_timeout: 2,
  max_lifetime: 2,
});
