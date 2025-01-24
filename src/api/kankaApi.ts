/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectionStatus } from '../types';
import { commonHeaders } from './constants';

export const validateConnection = async (
    apiKey: string,
    baseUrl: string
): Promise<ConnectionStatus> => {
    try {
        const response = await fetch(`${baseUrl}/campaigns`, {
            headers: commonHeaders(apiKey),
        });

        if (response.ok) {
            return 'valid';
        }
        throw new Error('Invalid API Key or URL');
    } catch {
        return 'invalid';
    }
};

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
