import React from 'react'

const components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-6 space-y-3 ml-6 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-6 space-y-3 ml-6 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-900 dark:text-white" {...props}>
      {children}
    </em>
  ),
  code: ({ children, ...props }) => (
    <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="mb-6 p-4 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto border border-gray-800 shadow-lg" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="mb-6 pl-4 border-l-4 border-primary-500 italic text-gray-600 dark:text-gray-400 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline font-medium"
      {...props}
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="my-10 border-gray-200 dark:border-gray-800" />
  ),
}

export default function ArticleContent({ content }) {
  if (!content) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg">
          <span>⚠️ 文章内容正在准备中...</span>
        </div>
      </div>
    )
  }

  // Simple markdown parsing for demo purposes
  // In production, use remark/remark-html
  const lines = content.split('\n')
  const elements = []
  let inCodeBlock = false
  let codeContent = []
  let codeLang = ''

  const flushCodeBlock = () => {
    if (codeContent.length > 0) {
      elements.push(
        <pre key={elements.length} className="mb-6">
          <code className={`language-${codeLang}`}>
            {codeContent.join('\n')}
          </code>
        </pre>
      )
      codeContent = []
      inCodeBlock = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Code block start
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        inCodeBlock = true
        codeLang = trimmed.replace('```', '').trim()
        codeContent = []
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={elements.length}>{trimmed.replace('### ', '')}</h3>)
    } else if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={elements.length}>{trimmed.replace('## ', '')}</h2>)
    } else if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={elements.length}>{trimmed.replace('# ', '')}</h1>)
    } else if (trimmed.startsWith('---')) {
      elements.push(<hr key={elements.length} />)
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(':`')) {
      // Bold text on its own line
      elements.push(<p key={elements.length}><strong>{trimmed.replace(/\*\*/g, '')}</strong></p>)
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      // List item
      const lastElement = elements[elements.length - 1]
      if (lastElement?.type === 'ul') {
        lastElement.props.children.push(
          <li key={lastElement.props.children.length}>{trimmed.substring(2)}</li>
        )
      } else {
        const ul = <ul key={elements.length}><li>{trimmed.substring(2)}</li></ul>
        ul.type = 'ul'
        elements.push(ul)
      }
    } else if (trimmed.includes('`') && !trimmed.startsWith('```')) {
      // Inline code
      const parts = trimmed.split(/`(.+?)`/)
      const children = parts.map((part, idx) => 
        idx % 2 === 0 ? part : <code key={idx}>{part}</code>
      )
      elements.push(<p key={elements.length}>{children}</p>)
    } else if (trimmed) {
      // Regular text
      elements.push(<p key={elements.length}>{trimmed}</p>)
    } else {
      // Empty line
      elements.push(<br key={elements.length} />)
    }
  }

  flushCodeBlock()

  return (
    <div className="article-content">
      {elements.map((element, index) => (
        <React.Fragment key={index}>
          {element}
        </React.Fragment>
      ))}
      
      {/* Custom Styles */}
      <style jsx global>{`
        .article-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .article-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .article-content pre {
          background: #1e1e1e !important;
          color: #d4d4d4 !important;
          border-radius: 8px !important;
          padding: 1.5rem !important;
          overflow-x: auto !important;
          margin: 1.5rem 0 !important;
        }
        .article-content code {
          font-family: 'Monaco', 'Consolas', monospace !important;
          font-size: 0.9em !important;
        }
      `}</style>
    </div>
  )
}