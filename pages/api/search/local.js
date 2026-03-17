import { articles, sections } from '@/lib/siteData'

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const q = String(req.query.q || '').trim().toLowerCase()
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' })

  const results = articles
    .filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      sections[item.section].title.toLowerCase().includes(q)
    )
    .map((item) => ({ ...item, sectionTitle: sections[item.section].title, color: sections[item.section].color }))

  res.status(200).json({ query: q, total: results.length, results })
}
