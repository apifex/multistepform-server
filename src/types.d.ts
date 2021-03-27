declare global{
    namespace NodeJS {
        interface ProcessEnv {
            HASH: string,
            JWT_PRIVATE_SECRET: string,
            JWT_PUBLIC_SECRET: string,
            
        }
    }
}


export {}