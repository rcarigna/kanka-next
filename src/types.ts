/* eslint-disable @typescript-eslint/no-explicit-any */
export type CampaignType = {
    id: number;
    name: string;
    locale: string | null;
    entry: string;
    entry_parsed: string;
    image: string | null;
    image_full: string | null;
    image_thumb: string | null;
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
    connection: KankaConnectionType;
    campaigns: CampaignType[];
    fetchEntity: (entityType: string, save: (data: any[]) => void) => void;
    selectedCampaign?: number;
    setSelectedCampaign: (value: number | undefined) => void;
    // fetchEntitiesForType: (entityType: string, save: (data: any[]) => void) => void;
    // fetchEntityById: ({ entityType, id }: { entityType: string; id: number }) => void;
};


export type ConnectionType = {
    apiKey: string | undefined;
    setApiKey: (value: string | undefined) => void;
    clearApiKey: () => void;
    baseUrl: string;
    setBaseUrl: (value: string) => void;
    status: ConnectionStatus;
};

export type KankaConnectionType = {
    connection: ConnectionType;
    // loading: boolean;
    error: string;
    // fetchData: ({
    //     endpoint,
    //     save,
    // }: {
    //     endpoint: string;
    //     save: (value: any[]) => void;
    // }) => void;
};


export type ConnectionStatus = 'loading' | 'valid' | 'invalid' | 'apiKeyMissing';

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

export type EntityGridProps = {
    entities: JSX.Element[];
    dataTestId?: string;
};