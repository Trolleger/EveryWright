// Sends the demo request to the Cloudflare Pages Function at functions/api/demo-request.js,
// which emails it to hello@everywright.com.
//
// Expected input: { name, businessName, email, phone, website, need, company_website }
// company_website is a hidden honeypot field. Real visitors leave it empty.
// Resolves when the request is received. Rejects if it fails.
export async function submitDemoRequest(data) {
  const response = await fetch('/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Demo request failed with status ${response.status}`);
  }
}
