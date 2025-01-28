import { validateConnection, fetchEntity, fetchEntityMap, fetchEntityById, fetchEntitiesForType, generateEntityPath } from './kankaApi';
import { entityMap } from './entityMap';

global.fetch = jest.fn();
const apiKey = 'test-api-key';
const baseUrl = 'https://api.kanka.io';
jest.mock('./apiConfig', () => ({
    getApiConfig: jest.fn(() => ({ apiKey, baseUrl, selectedCampaign: 123 })),
    setApiConfig: jest.fn(),
}));

describe('kankaApi', () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });
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
        const entityType = 'campaigns';

        it('should fetch and return entity data when the request is successful', async () => {
            const mockData = [{ id: 1, name: 'Test Character' }];
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ data: mockData }),
            });

            const result = await fetchEntity(apiKey, entityType);
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${baseUrl}/${entityType}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
            });
        });

        it('should throw an error when the request fails', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });

            await expect(fetchEntity(apiKey, entityType)).rejects.toThrow(`Failed to fetch ${entityType}`);
        });
    });

    describe('fetchEntityById', () => {
        const entityType = 'character';
        const id = 1;

        it('should fetch and return entity data when the request is successful', async () => {
            const mockData = { id, name: 'Entity 1', entity_id: 1, tags: ['tag1', 'tag2'] };
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
            });

            const result = await fetchEntityById({ entityType, id });
            expect(result).toEqual(mockData);
        });

        it('should throw an error when the entity type is invalid', async () => {
            const entityType = 'invalid_entity';
            const id = 1;

            await expect(fetchEntityById({ entityType, id })).rejects.toThrow(`Invalid entity type: ${entityType}`);
        });
    });

    describe('fetchEntitiesForType', () => {
        it('should fetch and return entity data when the request is successful', async () => {
            const entityType = 'character';
            const selectedCampaign = 123;
            const mockData = [{ id: 1, name: 'Test Character' }];
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ data: mockData }),
            });

            const result = await fetchEntitiesForType({ entityType, selectedCampaign });
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(`${baseUrl}/campaigns/${selectedCampaign}/${entityType}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should throw an error when the request fails', async () => {
            const entityType = 'character';
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });
            const selectedCampaign = 123;


            await expect(fetchEntitiesForType({ entityType, selectedCampaign })).rejects.toThrow(`Failed to fetch ${entityType}`);
        });
    });

    describe('generateEntityPath', () => {

        it('should generate the correct path for campaigns', () => {
            const path = generateEntityPath({ entityType: 'campaigns' });
            expect(path).toBe('https://api.kanka.io/campaigns');
        });

        it('should generate the correct path for other entity types', () => {
            const path = generateEntityPath({ entityType: 'character', selectedCampaign: 123 });
            expect(path).toBe('https://api.kanka.io/campaigns/123/character');
        });

        it('should throw an error for invalid entity types', () => {
            expect(() => generateEntityPath({ entityType: 'invalidType' })).toThrow('Invalid entity type: invalidType');
        });
    });
});