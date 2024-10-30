declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_XATA_PG_ENDPOINT: string;
      API_KEY: string;
    }
  }
}

export {};
