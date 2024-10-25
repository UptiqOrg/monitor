declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_XATA_PG_ENDPOINT: string;
    }
  }
}

export {};
