// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Lloyds Bank — High Street',
        address: '24 High Street, London, EC1A 2BN',
        phone: '0345 602 1997',
        hours: 'Mon-Fri 9:00-17:00, Sat 9:30-12:30'
    },
    {
        name: 'Lloyds Bank — Cheapside',
        address: '101 Cheapside, London, EC2V 6DT',
        phone: '0345 300 0000',
        hours: 'Mon-Fri 9:30-16:30, Sat closed'
    },
    {
        name: 'Lloyds Bank — Camden Town',
        address: '52 Camden High Street, London, NW1 0LT',
        phone: '0345 300 0000',
        hours: 'Mon-Fri 9:00-16:30, Sat 9:00-13:00'
    }
];

module.exports = async ({ postcode = '' }) => {
    if (!postcode || typeof postcode !== 'string' || !postcode.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a postcode or town to search branches near.' }],
            // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
            structuredContent: { branches: [] }
        };
    }

    const query = postcode.trim();

    // TODO: replace MOCK_DATA filtering with a real branch-locator API call (see block below).
    const branches = MOCK_DATA;

    const summary = `Found ${branches.length} Lloyds Bank branch${branches.length === 1 ? '' : 'es'} near ${query}.`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
        structuredContent: { branches }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/branches?postcode=${postcode}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/branches?postcode=${encodeURIComponent(postcode)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
