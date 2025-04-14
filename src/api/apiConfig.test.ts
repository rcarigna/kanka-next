import { setApiConfig, getApiConfig } from './apiConfig';

describe('apiConfig', () => {
    afterEach(() => {
        // Reset the apiKey and baseUrl after each test
        setApiConfig('', '');
    });

    test('should set and get API configuration', () => {
        const apiKey = 'testApiKey';
        const baseUrl = 'https://api.example.com';

        setApiConfig(apiKey, baseUrl);
        const config = getApiConfig();

        expect(config.apiKey).toBe(apiKey);
        expect(config.baseUrl).toBe(baseUrl);
    });

    test('should throw an error if API configuration is not set', () => {
        expect(() => getApiConfig()).toThrow('API configuration is not set');
    });
});