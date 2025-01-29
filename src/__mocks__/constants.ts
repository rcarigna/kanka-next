import { KankaContextType } from "../types";

export const campaigns = [
    {
        name: 'Waterdhavian Webs',
        id: 206764,
        locale: '',
        entry: '',
        entry_parsed: '',
        image: '',
        image_full: '',
        image_thumb: '',
        visibility: '',
        visibility_id: 0,
        created_at: '',
        updated_at: '',
    },
];

export const mockContext: KankaContextType = {
    connection: {
        connection: {
            baseUrl: 'https://kanka.io',
            apiKey: '123',
            setApiKey: jest.fn(),
            clearApiKey: jest.fn(),
            status: 'valid',
            setBaseUrl: jest.fn(),
        },
        error: '',
    },
    campaigns: campaigns,
    fetchEntity: jest.fn(),
    setSelectedCampaign: jest.fn(),
};
