// Pings IndexNow (Bing, plus Yandex, Seznam, Naver and the other engines that
// share its submissions) with URLs that changed, so they are recrawled within
// hours instead of whenever Bingbot next wanders by.
//
// Run it only after a deploy is live on toolzonex.com: the engines verify the
// submission by fetching the key file (public/<KEY>.txt) from the site.
//
//   npm run indexnow                               # every URL in the live sitemap.xml + sitemap-bing.xml
//   npm run indexnow -- /utilities/tip-screen ...  # just these paths
//
// Submit what actually changed. Re-sending an unchanged site on every deploy is
// what IndexNow asks sites not to do.

const SITE_URL = 'https://toolzonex.com';
const KEY = 'b5b3116b5469ea3e0b2e1699186d5f41';
const SITEMAPS = ['sitemap.xml', 'sitemap-bing.xml'];

async function sitemapUrls() {
  const urls = [];
  for (const name of SITEMAPS) {
    const res = await fetch(`${SITE_URL}/${name}`);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    const xml = await res.text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return [...new Set(urls)];
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length
    ? args.map((p) => (p.startsWith('http') ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${p}`))
    : await sitemapUrls();

  const keyRes = await fetch(`${SITE_URL}/${KEY}.txt`);
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    throw new Error(`Key file ${SITE_URL}/${KEY}.txt is not live yet. Deploy first, then rerun.`);
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 = accepted, 202 = accepted while the key is still being verified.
  console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
