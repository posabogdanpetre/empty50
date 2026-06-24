// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Mortgages',
        description: 'Find a mortgage deal that suits your needs, compare rates, or apply online or in the app — including the £5k Deposit Mortgage for first-time buyers.',
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/remortgage-desktop-lloyds.jpg',
        category: 'Mortgage'
    },
    {
        name: 'Current accounts',
        description: "From everyday banking to bank accounts with added rewards, find what's right for you.",
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/lds-current-accounts-homepage-desktop-vertical.jpg',
        category: 'Checking'
    },
    {
        name: 'Investments',
        description: "Whether you're an experienced investor or just starting out, we have an investment product for you.",
        image_url: 'https://www.lloydsbank.com/assets/investing/tye/wheatfield-767x384.jpg',
        category: 'Investment'
    },
    {
        name: 'Personal loans',
        description: 'For big ideas or smaller plans, see how much you could borrow before you apply. The amount and rate depend on your circumstances.',
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/personal-loan-desktop-lloyds.jpg',
        category: 'Personal Loan'
    },
    {
        name: 'Credit cards',
        description: "Check your eligibility before you apply. It takes about 5 minutes and won't affect your credit score.",
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/credit-card-desktop-lloyds.jpg',
        category: 'Credit Card'
    },
    {
        name: 'Home insurance',
        description: 'Straightforward home insurance with monthly payment at no extra fee, a 24/7 emergency claims line, and rebuild costs handled for you.',
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/home-ins-hp-carousel-desktop.jpg',
        category: 'Insurance'
    },
    {
        name: 'Car finance',
        description: 'Ready to upgrade your wheels? Discover car finance options to get you on the road.',
        image_url: 'https://www.lloydsbank.com/assets/homepage/homepage-new/lloyds-car-finance-carousel-desktop.jpg',
        category: 'Auto Loan'
    }
]

const VALID_CATEGORIES = [
    'Mortgage', 'Checking', 'Investment', 'Personal Loan', 'Credit Card', 'Insurance', 'Auto Loan'
]

module.exports = async ({ category = '' } = {}) => {
    const filter = typeof category === 'string' ? category.trim() : ''

    if (filter && !VALID_CATEGORIES.includes(filter)) {
        return {
            content: [{
                type: 'text',
                text: `Unknown category "${filter}". Valid categories are: ${VALID_CATEGORIES.join(', ')}.`
            }],
            // structuredContent.products — derived from action name "list_banking_products" (bare array outputSchema rule)
            structuredContent: { products: [] }
        }
    }

    const products = filter
        ? MOCK_DATA.filter((p) => p.category === filter)
        : MOCK_DATA.slice()

    const summary = filter
        ? `Found ${products.length} ${filter} product${products.length === 1 ? '' : 's'} at Lloyds Bank.`
        : `Lloyds Bank offers ${products.length} personal banking products: ${products.map((p) => p.name).join(', ')}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.products — derived from action name "list_banking_products" (bare array outputSchema rule)
        structuredContent: { products }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
