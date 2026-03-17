import { NextApiRequest, NextApiResponse } from 'next'

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || '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'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q } = req.query

  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'Query parameter "q" is required' })
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: q,
        search_depth: 'basic',
        topic: 'general',
        days: 7,
        max_results: 10,
        include_answer: false,
        include_raw_content: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Tavily API error:', errorData)
      return res.status(response.status).json({ 
        error: 'Tavily API error',
        details: errorData 
      })
    }

    const data = await response.json()
    
    // Map results to our format
    const results = data.results?.map((result, index) => ({
      id: index,
      title: result.title,
      url: result.url,
      snippet: result.content || result.snippet || '',
      score: result.score,
      published_date: result.published_date,
    })) || []

    res.status(200).json({
      query: q,
      results,
      response_time: data.response_time,
    })

  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}