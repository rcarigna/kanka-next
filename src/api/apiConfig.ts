let apiKey: string | undefined;
let baseUrl: string | undefined;

export const setApiConfig = (key: string, url: string,) => {
    apiKey = key;
    baseUrl = url;
};


export const getApiConfig = () => {
    if (!apiKey || !baseUrl) {
        throw new Error('API configuration is not set');
    }
    return { apiKey, baseUrl };
};