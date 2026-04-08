export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug || slug.length === 0) {
    return res.redirect(302, 'https://bluepad.ai');
  }

  const slugStr = Array.isArray(slug) ? slug[0] : slug;
  const efUrl = `https://mhmadvkbwjsbqpkdqhmk.supabase.co/functions/v1/short-link-resolve?slug=${encodeURIComponent(slugStr)}`;

  try {
    const response = await fetch(efUrl, {
      method: 'GET',
      headers: {
        'x-vercel-ip-country': req.headers['x-vercel-ip-country'] || '',
        'user-agent': req.headers['user-agent'] || '',
        'referer': req.headers['referer'] || '',
      },
      redirect: 'manual',
    });

    const location = response.headers.get('location');
    if (location) {
      return res.redirect(response.status, location);
    }

    return res.redirect(302, 'https://bluepad.ai');
  } catch (err) {
    return res.redirect(302, 'https://bluepad.ai');
  }
}
