import { validateConnection, fetchEntityMap, fetchEntitiesForType, getEntityPath, getEntityByID, getEntityTypes } from './kankaApi';
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
            expect(fetchEntityMap()).toEqual(entityMap.map((entity) => ({ ...entity, path: `./${entity.code}` })));
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


            await expect(fetchEntitiesForType({ entityType, selectedCampaign })).rejects.toThrow(`Failed to fetch entities for type: ${entityType}`);
        });
    });

    describe('generateEntityPath', () => {

        it('should generate the correct path for campaigns', () => {
            const path = getEntityPath({ entityType: 'campaigns' });
            expect(path).toBe('https://api.kanka.io/campaigns');
        });

        it('should generate the correct path for other entity types', () => {
            const path = getEntityPath({ entityType: 'character', selectedCampaign: 123 });
            expect(path).toBe('https://api.kanka.io/campaigns/123/character');
        });

        it('should throw an error for invalid entity types', () => {
            expect(() => getEntityPath({ entityType: 'invalidType' })).toThrow('Invalid entity type: invalidType');
        });
    });

    describe('getEntityByID', () => {
        it('should fetch and return entity data when the request is successful', async () => {
            const entityType = 'character';
            const id = 1;
            const mockData = { id, name: 'Test Character' };
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ data: mockData }),
            });

            const result = await getEntityByID(entityType, 123, id);
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(`${baseUrl}/campaigns/123/${entityType}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should throw an error when the request fails', async () => {
            const entityType = 'character';
            const id = 1;
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });

            await expect(getEntityByID(entityType, 123, id)).rejects.toThrow(`Failed to fetch entity with id ${id} of type ${entityType}`);
        });
    });

    describe('getEntityTypes', () => {
        it('should fetch and return entity types when the request is successful', async () => {
            const result = await getEntityTypes();
            expect(result).toEqual(entityMap.map((entity) => ({ ...entity, path: `./${entity.code}` })));

        });
    });
});