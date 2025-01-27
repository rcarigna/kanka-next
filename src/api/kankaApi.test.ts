import { validateConnection, fetchEntity, fetchEntityMap } from './kankaApi';
import { entityMap } from './entityMap';

global.fetch = jest.fn();

describe('kankaApi', () => {
    const apiKey = 'test-api-key';
    const baseUrl = 'https://api.kanka.io';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validateConnection', () => {
        it('should return "valid" when the connection is successful', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
            });

            const result = await validateConnection(apiKey, baseUrl);
            expect(result).toBe('valid');
            expect(fetch).toHaveBeenCalledWith(`${baseUrl}/campaigns`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should return "invalid" when the connection fails', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });

            const result = await validateConnection(apiKey, baseUrl);
            expect(result).toBe('invalid');
        });

        it('should return "invalid" when an error occurs', async () => {
            (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

            const result = await validateConnection(apiKey, baseUrl);
            expect(result).toBe('invalid');
        });
    });

    describe('fetchEntityMap', () => {
        it('should return the entity map', () => {
            expect(fetchEntityMap()).toEqual(entityMap);
        });
    });

    describe('fetchEntity', () => {
        const entityType = 'characters';

        it('should fetch and return entity data when the request is successful', async () => {
            const mockData = [{ id: 1, name: 'Test Character' }];
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ data: mockData }),
            });

            const result = await fetchEntity(apiKey, baseUrl, entityType);
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(`${baseUrl}/${entityType}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should throw an error when the request fails', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });

            await expect(fetchEntity(apiKey, baseUrl, entityType)).rejects.toThrow(`Failed to fetch ${entityType}`);
        });
    });
});