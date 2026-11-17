export default function OurWork() {
  return (
    <section className="section section-tint" id="our-work" aria-labelledby="work-heading">
      <div className="container">
        <h2 id="work-heading">Our work</h2>
        <div className="card work-placeholder">
          <p>
            We're new, and our first sites are being built right now. Want yours to be one of them?
            Our first 5 clients get early pricing.
          </p>
          <a className="btn btn-primary" href="#contact">Get a free demo</a>
        </div>
        {/* TODO: replace with real before-and-after examples once clients give permission.
            Never add made-up examples or testimonials. */}
      </div>
    </section>
  );
}
