import { CampaignType, KankaContextType } from "../types";

export const campaigns: CampaignType[] = [
    {
        "id": 206764,
        "name": "Waterdhavian Webs", "locale": "en-US",
        "entry": "<p>A band of strangers brought together by a chance encounter with a troll in the Yawning Portal began a mad romp through the wards of Waterdeep. The group uncovered plot after villainous plot, involving some of the city\u2019s most influential, and infamous, figures.<\/p>",
        "entry_parsed": "not available on the campaigns\/ endpoint",
        "image": "campaigns\/64c0230b19318_dragon-heist0jpg.jpeg",
        "image_full": "https:\/\/th.kanka.io\/vxfY43YqbAKDbsmGyls2XNSIPCs=\/smart\/src\/campaigns\/64c0230b19318_dragon-heist0jpg.jpeg",
        "image_thumb": "https:\/\/th.kanka.io\/HermHvUMp9-iExjYYW7uKdvBCuM=\/400x400\/smart\/src\/campaigns\/64c0230b19318_dragon-heist0jpg.jpeg",
        "visibility": "private",
        "visibility_id": 1,
        "created_at": "2023-07-25T01:20:18.000000Z",
        "updated_at": "2023-07-25T21:09:56.000000Z",

    },
    {
        "id": 224571,
        "name": "Campaign Three: Moonshae",
        "locale": "en-US",
        "entry": "<p>Welcome to the Moonshae Isles! This site will act as campaign guide, wiki, and notes compendium.\u00a0<\/p>",
        "entry_parsed": "not available on the campaigns\/ endpoint",
        "image": null,
        "image_full": "",
        "image_thumb": "",
        "visibility": "private",
        "visibility_id": 1,
        "created_at": "2023-11-10T19:26:58.000000Z",
        "updated_at": "2024-04-26T19:49:20.000000Z",
    },
    {
        "id": 259381,
        "name": "Curse of Strahd",
        "locale": null,
        "entry": "<p>Adventures in Barovia<\/p>",
        "entry_parsed": "not available on the campaigns\/ endpoint",
        "image": "w\/z9OkHJJg1QX2cF0VnD2IViKfak4mh6mOKlZBYezS.jpg",
        "image_full": "https:\/\/th.kanka.io\/KYc4ucA94d_fq1AcIYVF0oG0zD4=\/smart\/src\/w\/z9OkHJJg1QX2cF0VnD2IViKfak4mh6mOKlZBYezS.jpg",
        "image_thumb": "https:\/\/th.kanka.io\/ImTMT6_XzXmjuSXx_71pl85mkkI=\/400x400\/smart\/src\/w\/z9OkHJJg1QX2cF0VnD2IViKfak4mh6mOKlZBYezS.jpg",
        "visibility": "private",
        "visibility_id": 1,
        "created_at": "2024-06-18T22:14:49.000000Z",
        "updated_at": "2024-06-20T21:49:37.000000Z",
    }
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
    selectedCampaign: undefined,
    setSelectedCampaign: jest.fn().mockImplementation((id: number) => { mockContext.selectedCampaign = id }),
    entityTypes: [{
        "id": 0,
        "code": "campaigns"
    },
    {
        "id": 1,
        "code": "character"
    },
    {
        "id": 2,
        "code": "family"
    },
    {
        "id": 3,
        "code": "location"
    },
    {
        "id": 4,
        "code": "organisation"
    },
    {
        "id": 5,
        "code": "item"
    },
    {
        "id": 6,
        "code": "note"
    },
    {
        "id": 7,
        "code": "event"
    },
    {
        "id": 8,
        "code": "calendar"
    },
    {
        "id": 9,
        "code": "race"
    },
    {
        "id": 10,
        "code": "quest"
    },
    {
        "id": 11,
        "code": "journal"
    }],
};
