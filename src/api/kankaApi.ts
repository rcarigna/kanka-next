/* eslint-disable @typescript-eslint/no-explicit-any */
import { CampaignType, ConnectionStatus } from '../types';
import { setApiConfig, getApiConfig } from './apiConfig';
import { commonHeaders } from './constants';
import { entityMap } from './entityMap';


type FetchEntitiesParams = {
    entityType: string;
    selectedCampaign?: number;
};

type GenerateEntityPathParams = {
    entityType: string;
    selectedCampaign?: number;
};
/**
 * Validates the connection to the Kanka API.
 * @param apiKey - The API key for authentication.
 * @param baseUrl - The base URL of the Kanka API.
 * @returns The connection status.
 */
export const validateConnection = async (
    apiKey: string,
    baseUrl: string
): Promise<ConnectionStatus> => {
    try {
        // @TODO: change to use entitites endpoint
        const response = await fetch(`${baseUrl}/campaigns`, {
            headers: commonHeaders(apiKey),
        });

        if (response.ok) {
            setApiConfig(apiKey, baseUrl);
            return 'valid';
        }
        throw new Error('Invalid API Key or URL');
    } catch (error) {
        console.error('Error validating connection:', error);

        return 'invalid';
    }
};


/**
 * Fetches the entity map - aka: the Kanka REST API endpoints.
 * @returns The entity map.
 */
export const fetchEntityMap = () => entityMap.map((entity) => ({ ...entity, path: `./${entity.code}` }));


/**
 * Generates the API path for fetching entities of a given type.
 * @param params - The parameters for generating the entity path.
 * @returns The API path for fetching entities.
 */
export const getEntityPath = ({ entityType, selectedCampaign }: GenerateEntityPathParams): string => {
    console.log(`entityType: ${entityType}`);
    console.log(`selectedCampaign: ${selectedCampaign}`);
    // console.log('entityMap', entityMap);
    const entity = entityMap.find((entity) => entity.code === entityType);
    if (!entity) {
        throw new Error(`Invalid entity type: ${entityType}`);
    }
    const { baseUrl } = getApiConfig();

    if (entityType === 'campaigns' || entityType === 'entities') {
        return `${baseUrl}/${entityType}`;
    }
    return `${baseUrl}/campaigns/${selectedCampaign}/${entity.code}s`;
};
/**
 * Fetches all instances of an entity type for the selected campaign with an existing API connection.
 * @param param0 
 * @returns 
 */
export const fetchEntitiesForType = async ({ entityType, selectedCampaign }: FetchEntitiesParams) => {
    const { apiKey } = getApiConfig();
    const path = getEntityPath({ entityType, selectedCampaign });
    const response = await fetch(path, {
        headers: commonHeaders(apiKey),
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch entities for type: ${entityType}`);
    }

    return response.json().then((data) => data.data);
};

/**
 * Fetches all campaigns with an existing API connection.
 * @returns 
 */
export const getCampaigns = async (): Promise<CampaignType[]> => {
    return fetchEntitiesForType({ entityType: 'campaigns' });
};

/**
 * Fetches all entities with an existing API connection.
 * @returns 
 */
export const getEntityTypes = async () => {
    return fetchEntityMap();
};

/**
 * Fetches an entity by its type and ID.
 * @param entityType - The entity type.
 * @param id - The entity ID.
 * @returns The entity data.
 */
export const getEntityByID = async (entityType: string, campaign: number, id: number): Promise<any> => {
    console.log('entityType', entityType);
    console.log('id', id);
    const { apiKey } = getApiConfig();
    console.log('apiKey', apiKey);
    const path = `${getEntityPath({ entityType, selectedCampaign: campaign })}/${id}`;
    console.log('path', path);
    const response = await fetch(path, {
        headers: commonHeaders(apiKey),
    });
    console.log('response', response);
    if (!response.ok) {
        console.log('reponse is NOT okay. throwing error');
        console.log('response.statusText', response.statusText);
        console.log(`Failed to fetch entity with id ${id} of type ${entityType}`)
        throw new Error(`Failed to fetch entity with id ${id} of type ${entityType}`);
    }
    console.log('response.json()', response.json());
    return response.json().then((data) => data.data);
};