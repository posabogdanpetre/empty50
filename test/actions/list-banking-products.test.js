const handler = require('../../actions/list-banking-products/index.js')

describe('list_banking_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"What products do you offer?" returns the full product range', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.products.length).toBe(7)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('filters products by category', async () => {
        const out = await handler({ category: 'Mortgage' })
        const products = out.structuredContent.products
        expect(products.length).toBe(1)
        expect(products.every((p) => p.category === 'Mortgage')).toBe(true)
    })

    test('returns an error hint when category is not a known value', async () => {
        const out = await handler({ category: 'Crypto' })
        expect(out.content[0].text).toMatch(/unknown category|valid categories/i)
        expect(out.structuredContent.products.length).toBe(0)
    })
})
