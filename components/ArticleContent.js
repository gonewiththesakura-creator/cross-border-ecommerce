import React from 'react'

export default function ArticleContent({ content }) {
  if (!content) return <div className="text-slate-500">内容整理中。</div>

  const lines = content.split('\n')
  const elements = []
  let inCode = false
  let code = []

  const flushCode = () => {
    if (!code.length) return
    elements.push(
      <pre key={elements.length} className="my-8 overflow-x-auto rounded-2xl bg-slate-950 px-5 py-4 text-sm text-slate-100">
        <code>{code.join('\n')}</code>
      </pre>
    )
    code = []
    inCode = false
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('```')) {
      if (inCode) flushCode()
      else inCode = true
      continue
    }
    if (inCode) {
      code.push(raw)
      continue
    }
    if (!line) {
      elements.push(<div key={elements.length} className="h-2" />)
      continue
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={elements.length} className="mt-12 mb-5 text-3xl font-semibold">{line.slice(3)}</h2>)
      continue
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={elements.length} className="mt-10 mb-4 text-2xl font-semibold">{line.slice(4)}</h3>)
      continue
    }
    if (/^\d+\.\s/.test(line)) {
      elements.push(<p key={elements.length} className="my-3 text-[17px] leading-8 text-slate-700">{line}</p>)
      continue
    }
    if (line.startsWith('- ')) {
      elements.push(<p key={elements.length} className="my-3 pl-4 text-[17px] leading-8 text-slate-700 before:mr-2 before:text-slate-400 before:content-['•']">{line.slice(2)}</p>)
      continue
    }
    const parts = line.split(/`(.+?)`/)
    elements.push(
      <p key={elements.length} className="my-4 text-[18px] leading-9 text-slate-700">
        {parts.map((part, i) => i % 2 ? <code key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[15px] text-slate-900">{part}</code> : part)}
      </p>
    )
  }
  flushCode()

  return <div>{elements}</div>
}
