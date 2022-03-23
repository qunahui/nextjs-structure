const fs = require('fs')
const data = require('../pages/services/data.json')

const pages = ['', ...Object.keys(data)]

function addServicePage(page, index) {
  const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
  const route = path === '/index' ? '' : path

  return `<url>
      <loc>${`${process.env.WEBSITE_URL}/services/${route}`}</loc>
      <changefreq>daily</changefreq>
      <priority>${(index === 0 ? 1 : 0.8).toFixed(2)}</priority>
    </url>`
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                      <url>
                        <loc>${`${process.env.WEBSITE_URL}/services/client`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>1.00</priority>
                      </url>
                      ${pages.map(addServicePage).join('\n')}
                    </urlset> 
                  `
  fs.writeFileSync('public/sitemap.xml', sitemap)
}

async function generateRobots() {
  fs.writeFileSync(
    'public/robots.txt',
    `User-agent: *\nAllow: /\nSitemap: ${process.env.WEBSITE_URL}/`,
  )
}

generateSitemap()
generateRobots()
