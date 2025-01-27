import { entityMap } from './entityMap';

describe('entityMap', () => {
    it('should contain an entity with code "location"', () => {
        const locationEntity = entityMap.find(entity => entity.code === 'location');
        expect(locationEntity).toBeDefined();
        expect(locationEntity?.id).toBe(3);
    });

    it('should have unique ids for each entity', () => {
        const ids = entityMap.map(entity => entity.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique codes for each entity', () => {
        const codes = entityMap.map(entity => entity.code);
        const uniqueCodes = new Set(codes);
        expect(uniqueCodes.size).toBe(codes.length);
    });
});