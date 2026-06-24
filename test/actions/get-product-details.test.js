const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ product_name: 'Current accounts' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about Current accounts" returns product details', async () => {
        const out = await handler({ product_name: 'Current accounts' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Current accounts/i)
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe('Current accounts')
        expect(out.structuredContent.category).toBe('Checking')
    })

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Mortgages' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('name')
        expect(out.structuredContent).toHaveProperty('description')
        expect(out.structuredContent).toHaveProperty('category')
        expect(out.structuredContent).toHaveProperty('image_url')
    })

    test('returns error message when product_name is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product returns not-found with no structuredContent', async () => {
        const out = await handler({ product_name: 'Spaceship insurance' })
        expect(out.content[0].text).toMatch(/no product found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
