const config = {
    development: {
        baseApiUrl: import.meta.env.VITE_API_URL,
        timeout: import.meta.env.VITE_API_TIMEOUT
    }
}

export const devConfig = config.development