import { commonHeaders } from './constants';

describe('commonHeaders', () => {
    it('should return headers with the provided apiKey', () => {
        const apiKey = 'testApiKey';
        const headers = commonHeaders(apiKey);

        expect(headers).toEqual({
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        });
    });

    it('should return headers with a different apiKey', () => {
        const apiKey = 'anotherTestApiKey';
        const headers = commonHeaders(apiKey);

        expect(headers).toEqual({
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        });
    });
});