// Everywright mailer: a private Worker that sends email through Cloudflare Email Service.
// Only the Everywright Pages site can reach it, through a service binding named MAILER.
// It has no public URL (workers_dev is off in wrangler.toml).
//
// Expects POST with JSON: { subject, text, replyTo }

const TO_ADDRESS = 'hello@everywright.com';
const FROM_ADDRESS = 'hello@everywright.com';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed.' }, { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const subject = typeof body.subject === 'string' ? body.subject.slice(0, 300) : '';
    const text = typeof body.text === 'string' ? body.text.slice(0, 10000) : '';
    const replyTo = typeof body.replyTo === 'string' ? body.replyTo : undefined;

    if (!subject || !text) {
      return Response.json({ error: 'Missing subject or text.' }, { status: 400 });
    }

    try {
      await env.EMAIL.send({
        to: TO_ADDRESS,
        from: FROM_ADDRESS,
        replyTo,
        subject,
        text,
      });
    } catch (error) {
      console.error('mailer: send failed', error?.code, error?.message);
      return Response.json({ error: 'Send failed.' }, { status: 500 });
    }

    return Response.json({ ok: true });
  },
};
