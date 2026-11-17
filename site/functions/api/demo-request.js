// Cloudflare Pages Function: receives the free demo request from the website
// and passes it to the private mailer Worker (mailer/), which emails hello@everywright.com.
//
// Setup needed in Cloudflare (see docs/deploy.md):
//   - Email Service onboarding for everywright.com
//   - Mailer Worker deployed
//   - A "Service binding" named MAILER on this Pages project, pointing at the mailer Worker
//
// Available at: POST /api/demo-request

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keep a value to a sensible length and strip line breaks (stops header tricks).
function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: a hidden field real visitors never fill in. Bots often do.
  // Pretend success so the bot doesn't learn anything.
  if (body.company_website) {
    return json({ ok: true });
  }

  const data = {
    name: clean(body.name, 200),
    businessName: clean(body.businessName, 200),
    email: clean(body.email, 320),
    phone: clean(body.phone, 50),
    website: clean(body.website, 300),
    need: typeof body.need === 'string' ? body.need.trim().slice(0, 3000) : '',
  };

  if (!data.name || !data.businessName || !EMAIL_PATTERN.test(data.email)) {
    return json({ error: 'Please fill in your name, business name and a valid email.' }, 400);
  }

  if (!env.MAILER) {
    console.error('demo-request: MAILER service binding is missing. Add it in Pages settings.');
    return json({ error: 'Sending is not set up yet.' }, 500);
  }

  const text = [
    'New free demo request from the Everywright website.',
    '',
    `Name: ${data.name}`,
    `Business name: ${data.businessName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '(not given)'}`,
    `Current website: ${data.website || '(not given)'}`,
    '',
    'What they need:',
    data.need || '(not given)',
  ].join('\n');

  try {
    // Hand the message to the private mailer Worker (service binding named MAILER).
    const response = await env.MAILER.fetch('https://mailer/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: `Free demo request: ${data.businessName}`,
        text,
        replyTo: data.email,
      }),
    });
    if (!response.ok) {
      throw new Error(`mailer responded ${response.status}`);
    }
  } catch (error) {
    console.error('demo-request: send failed', error?.message);
    return json({ error: 'We could not send your message. Please try again.' }, 500);
  }

  return json({ ok: true });
}

// Anything other than POST gets a clear "not allowed" answer.
export function onRequest() {
  return json({ error: 'Method not allowed.' }, 405);
}
