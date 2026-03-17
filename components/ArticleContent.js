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
      <pre key={elements.length} className="my-10 overflow-x-auto rounded-[24px] bg-slate-950 px-6 py-5 text-sm text-slate-100 shadow-[0_16px_36px_rgba(15,23,42,0.16)]">
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
      elements.push(<div key={elements.length} className="h-3" />)
      continue
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={elements.length} className="mt-16 mb-6 text-3xl font-semibold tracking-tight text-slate-950 md:text-[2.15rem]">{line.slice(3)}</h2>)
      continue
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={elements.length} className="mt-12 mb-5 text-2xl font-semibold tracking-tight text-slate-950">{line.slice(4)}</h3>)
      continue
    }
    if (/^\d+\.\s/.test(line)) {
      elements.push(<p key={elements.length} className="my-4 text-[18px] leading-9 text-slate-700">{line}</p>)
      continue
    }
    if (line.startsWith('- ')) {
      elements.push(<p key={elements.length} className="my-4 pl-5 text-[18px] leading-9 text-slate-700 before:mr-2 before:text-slate-400 before:content-['•']">{line.slice(2)}</p>)
      continue
    }
    const parts = line.split(/`(.+?)`/)
    elements.push(
      <p key={elements.length} className="my-5 text-[19px] leading-9 text-slate-700 md:text-[20px] md:leading-10">
        {parts.map((part, i) => i % 2 ? <code key={i} className="rounded-lg bg-slate-100 px-2 py-1 text-[15px] text-slate-900">{part}</code> : part)}
      </p>
    )
  }
  flushCode()

  return <div className="max-w-none">{elements}</div>
}
