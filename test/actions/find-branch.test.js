const handler = require('../../actions/find-branch/index.js');

describe('find_branch handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ postcode: 'EC1A 2BN' });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Find a branch near me" returns branch locations', async () => {
        const out = await handler({ postcode: 'London' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.branches.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ postcode: 'London' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('returns error message when postcode is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/postcode|provide/i);
        expect(out.structuredContent.branches).toEqual([]);
    });

    test('each branch has the expected store-locator fields', async () => {
        const out = await handler({ postcode: 'EC2V 6DT' });
        out.structuredContent.branches.forEach((b) => {
            expect(b).toHaveProperty('name');
            expect(b).toHaveProperty('address');
            expect(b).toHaveProperty('phone');
            expect(b).toHaveProperty('hours');
        });
    });
});
