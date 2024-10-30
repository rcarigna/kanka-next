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
    campaigns: CampaignType[];
    fetchData: (endpoint: string) => Promise<any[] | null>;
};


export type ConnectionType = {
    authorization: string;
    baseUrl: string;
    status: ConnectionStatus;
};

export type ConnectionStatus = 'loading' | 'valid' | 'invalid';
