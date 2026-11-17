export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="eyebrow">Web studio · Toronto</p>
        <h1>A new website for your business, live in 7 days.</h1>
        <p className="lead">
          We build a demo of your new site first, free. You only pay if you like it.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">Get my free demo</a>
          <a className="btn-link" href="#packages">See packages and prices</a>
        </div>
        <p className="fine-print">No contracts. No surprise fees. Real people in Toronto.</p>
      </div>
    </section>
  );
}
