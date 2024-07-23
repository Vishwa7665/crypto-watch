declare namespace NodeJS {
    interface ProcessEnv {
        LIVECOINWATCH_ENDPOINT: string;
        LIVECOINWATCH_API_KEY: string;
        MONGODB_URI: string;
        PORT?: string;
    }
}