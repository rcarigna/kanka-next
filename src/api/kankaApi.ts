/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from '../components/entities/EntityPanel/types';
import { ConnectionStatus } from '../types';
import { setApiConfig, getApiConfig } from './apiConfig';
import { commonHeaders } from './constants';
import { entityMap } from './entityMap';

export const validateConnection = async (
    apiKey: string,
    baseUrl: string
): Promise<ConnectionStatus> => {
    try {
        const response = await fetch(`${baseUrl}/campaigns`, {
            headers: commonHeaders(apiKey),
        });

        if (response.ok) {
            setApiConfig(apiKey, baseUrl);
            return 'valid';
        }
        throw new Error('Invalid API Key or URL');
    } catch {
        return 'invalid';
    }
};

export const fetchEntityMap = () => entityMap;

export const generateEntityPath = ({ entityType, selectedCampaign }: { entityType: string; selectedCampaign?: number }): string => {
    const entity = entityMap.find((entity) => entity.code === entityType);
    if (!entity) {
        throw new Error(`Invalid entity type: ${entityType}`);
    }
    const { baseUrl } = getApiConfig();

    if (entityType === 'campaigns' || entityType === 'entities') {
        return `${baseUrl}/${entityType}`;
    }
    return `${baseUrl}/campaigns/${selectedCampaign}/${entity.code}`;
}
/**
 * Fetches all instances of an entity of a given type for the selected campaign.
 * @param apiKey 
 * @param entityType 
 * @param selectedCampaign 
 * @returns 
 */
export const fetchEntity = async (
    apiKey: string,
    entityType: string,
    selectedCampaign?: number,
): Promise<any[]> => {
    // const endpoint = `${baseUrl}/${entityType}`;
    const endpoint = generateEntityPath({ entityType, selectedCampaign });
    const response = await fetch(endpoint, {
        headers: commonHeaders(apiKey),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${entityType}`);
    }

    const { data } = await response.json();
    return data;
};
/**
 * Fetches an instance of an entity type by said instance's id. NOT YET IMPLEMENTED
 * @param param0 
 * @returns 
 */
export const fetchEntityById = async ({ entityType, id }: { entityType: string, id: number }): Promise<Entity> => {
    const entity_id = entityMap.find((entity) => entity.code === entityType)?.id;
    if (!entity_id) {
        throw new Error(`Invalid entity type: ${entityType}`);
    }
    return {
        id,
        name: 'Entity 1',
        entity_id: entity_id,
        tags: ['tag1', 'tag2'],
    };
}

/**
 * Fetches all instances of an entity type for the selected campaign with an existing API connection.
 * @param param0 
 * @returns 
 */
export const fetchEntitiesForType = async ({ entityType, selectedCampaign }: { entityType: string; selectedCampaign?: number }): Promise<Entity[]> => {
    const { apiKey } = getApiConfig();
    return fetchEntity(apiKey, entityType, selectedCampaign);
};