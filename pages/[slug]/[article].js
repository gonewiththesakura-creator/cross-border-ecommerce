import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export async function generateStaticParams() {
  const sections = ['tiktok-marketing', 'independent-store', 'networking']
  const params = []

  for (const section of sections) {
    const sectionPath = path.join(contentDir, section)
    if (fs.existsSync(sectionPath)) {
      const files = fs.readdirSync(sectionPath)
      for (const file of files) {
        if (file.endsWith('.md')) {
          params.push({
            slug: section,
            article: file.replace('.md', '')
          })
        }
      }
    }
  }

  return params
}

export async function getStaticProps({ params }) {
  const filePath = path.join(contentDir, params.slug, `${params.article}.md`)

  if (!fs.existsSync(filePath)) {
    return { notFound: true }
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  // 简单处理 Markdown 内容 (生产环境建议用 remark/remark-html)
  const htmlContent = content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')
    .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>')
    .replace(/- (.*?)(\n|$)/g, '<li>$1</li>')

  return {
    props: {
      frontmatter: data,
      content: htmlContent,
      section: params.slug,
      slug: params.article
    }
  }
}