const packages = [
  {
    name: 'Starter',
    price: '$500',
    priceNote: 'one-time',
    features: ['5-page mobile-friendly website', 'Contact form', 'Live in 7 days'],
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    price: '$800',
    priceNote: '+ $99/month',
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Monthly care plan: hosting, updates and fixes',
      'Google Business Profile setup so you show up on Google Maps',
    ],
    cta: 'Choose Growth',
    featured: true,
  },
  {
    name: 'Everything',
    price: '$1,500',
    priceNote: '+ $99/month',
    features: ['Everything in Growth', 'Logo and brand kit', '10 social media graphics'],
    cta: 'Choose Everything',
  },
];

export default function Packages() {
  return (
    <section className="section section-tint" id="packages" aria-labelledby="packages-heading">
      <div className="container">
        <h2 id="packages-heading">Simple packages. Prices you can see.</h2>
        <p className="section-sub">Early-client pricing for our first 5 clients. All prices in CAD.</p>

        <div className="pricing-grid">
          {packages.map((pkg) => (
            <article className={`card price-card${pkg.featured ? ' is-featured' : ''}`} key={pkg.name}>
              {pkg.badge && <span className="badge">{pkg.badge}</span>}
              <h3>{pkg.name}</h3>
              <p className="price">
                <span className="price-main">{pkg.price}</span>{' '}
                <span className="price-note">{pkg.priceNote}</span>
              </p>
              <ul className="check-list">
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={`btn ${pkg.featured ? 'btn-primary' : 'btn-outline'} btn-block`}
                href="#contact"
              >
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="under-cards">
          Need booking, ads, an AI chat assistant or something else? We'll quote it. Just ask.
        </p>
      </div>
    </section>
  );
}
