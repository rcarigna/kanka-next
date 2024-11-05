/* eslint-disable @typescript-eslint/no-explicit-any */
export type CampaignType = {
    id: number;
    name: string;
    locale: string;
    entry: string;
    entry_parsed: string;
    image: string;
    image_full: string;
    image_thumb: string;
    visibility: string;
    visibility_id: number;
    created_at: string;
    updated_at: string;
    selected?: boolean;
};

export type KankaItem = {
    id: number;
    name: string;
};

export type KankaContextType = {
    status: ConnectionStatus;
    error: string | null;
    campaigns?: CampaignType[];
    // fetchData: (endpoint: string) => Promise<any[] | null>;
    fetchData: ({
        endpoint,
        save,
    }: {
        endpoint: string;
        save: (value: any[]) => void;
    }) => void;
};


export type ConnectionType = {
    authorization: string;
    baseUrl: string;
    status: ConnectionStatus;
};

export type ConnectionStatus = 'loading' | 'valid' | 'invalid';

export type fetchFromEndpointType = {
    status: ConnectionStatus;
    endpoint: string;
    baseUrl: string;
    commonHeaders: any;
    setError: (value: string) => void;
};
export type validateConnectionType = {
    apiKey: string;
    setError: (value: string) => void;
    setStatus: (value: ConnectionStatus) => void;
    commonHeaders: any;
    baseUrl: string;
};