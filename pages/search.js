'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, X, Globe, ArrowRight } from 'lucide-react'

const hotSearches = [
  'TikTok 广告',
  'Shopify 搭建',
  'SEO 优化',
  'VPS 购买',
  'SSL 证书',
  '独立站运营'
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [webResults, setWebResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setQuery('')
      setResults([])
      setWebResults([])
      return
    }

    setQuery(searchTerm)
    setIsSearching(true)
    setError(null)

    try {
      // Search our local content
      const localResponse = await fetch(`/api/search/local?q=${encodeURIComponent(searchTerm)}`)
      const localData = await localResponse.json()
      setResults(localData.results || [])

      // Also search the web via Tavily
      const webResponse = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      if (webResponse.ok) {
        const webData = await webResponse.json()
        setWebResults(webData.results || [])
      } else {
        setWebResults([])
      }
    } catch (err) {
      console.error('Search error:', err)
      setError('搜索失败，请稍后重试')
      // Fall back to local filtering
      const allContent = [
        // ... include local content array here or from a shared source
      ]
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setResults(filtered)
      setWebResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <span className="text-white font-bold">🦀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">跨境技术学习</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">跨境电商知识库</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/tiktok-marketing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">TikTok 运营</Link>
              <Link href="/independent-store" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">独立站</Link>
              <Link href="/networking" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">网络搭建</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              搜索课程内容
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              搜索 TikTok 运营、独立站建设、网络搭建相关教程
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                defaultValue={query}
                onKeyDown={handleKeyPress}
                placeholder="输入关键词搜索文章..."
                className="w-full pl-16 pr-16 py-4 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
              />
              {query && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {hotSearches.map(term => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {isSearching && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">正在搜索...</p>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">未找到结果</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                没有找到与 "{query}" 相关的课程内容
              </p>
              <Link href="/" className="btn-primary">
                浏览所有课程
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  课程结果 ({results.length})
                </h2>
              </div>

              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/${result.slug}`}
                  className="block card p-6 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${result.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-3xl">
                        {result.section === 'tiktok-marketing' ? '📱' : 
                         result.section === 'independent-store' ? '🏪' : '🌐'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {result.sectionTitle}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border
                          ${result.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            result.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                          {result.difficulty === 'beginner' ? '入门' :
                           result.difficulty === 'intermediate' ? '进阶' : '高级'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {result.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {result.excerpt}
                      </p>

                      <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <span className="text-gray-400">⏱️</span>
                          <span className="ml-1">{result.readTime} 分钟</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {result.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag text-xs">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">开始搜索</h3>
              <p className="text-gray-600 dark:text-gray-400">
                输入关键词或点击上方热门搜索
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 跨境技术学习 | 搜索 powered by Tavily</p>
        </div>
      </footer>
    </div>
  )
}