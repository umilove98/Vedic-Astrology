/**
 * Vercel Serverless Function — analysis counter
 * Uses Vercel KV (Upstash Redis) REST API
 *
 * Setup:
 * 1. Vercel 대시보드 → Storage → Create → KV (Upstash)
 * 2. 프로젝트에 연결하면 KV_REST_API_URL, KV_REST_API_TOKEN 자동 설정
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.json({ count: 0 });
  }

  try {
    if (req.method === 'POST') {
      const resp = await fetch(`${KV_URL}/incr/analysis_count`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      const data = await resp.json();
      return res.json({ count: data.result });
    }

    const resp = await fetch(`${KV_URL}/get/analysis_count`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const data = await resp.json();
    return res.json({ count: data.result || 0 });
  } catch {
    return res.json({ count: 0 });
  }
}
