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

export const fetchEntityMap = () => entityMap

export const fetchEntity = async (
    apiKey: string,
    baseUrl: string,
    entityType: string
): Promise<any[]> => {
    const endpoint = `${baseUrl}/${entityType}`;
    const response = await fetch(endpoint, {
        headers: commonHeaders(apiKey),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${entityType}`);
    }

    const { data } = await response.json();
    return data;
};

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

export const fetchEntitiesForType = async (entityType: string): Promise<Entity[]> => {
    const { apiKey, baseUrl } = getApiConfig();
    return fetchEntity(apiKey, baseUrl, entityType);
};
// export const createEntity = async (
//     apiKey: string,
//     baseUrl: string,
//     entityType: string,
//     entityData: Record<string, any>
// ): Promise<any> => {
//     const endpoint = `${baseUrl}/${entityType}`;
//     const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: commonHeaders(apiKey),
//         body: JSON.stringify(entityData),
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to create ${entityType}`);
//     }

//     return response.json();
// };
