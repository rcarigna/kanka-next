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
    data: KankaItem[];
};
