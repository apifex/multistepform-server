declare global{
    namespace NodeJS {
        interface ProcessEnv {
            HASH: string,
            GOOGLE_CLIENT_ID: string,
            GOOGLE_CLIENT_SECRET: string,
            JWT_PRIVATE_SECRET: string,
            JWT_PUBLIC_SECRET: string,
            
        }
    }
}


export {}