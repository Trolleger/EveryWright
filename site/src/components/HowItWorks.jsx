const steps = [
  {
    title: 'We build your demo.',
    text: "Tell us about your business. We'll build a demo of your new site, free, and send you the link.",
  },
  {
    title: 'You decide.',
    text: 'Like it? Pay 50% to get started, and we\'ll polish it with your photos, menu or services.',
  },
  {
    title: "You're live in 7 days.",
    text: "We launch your site, connect it to Google, and handle updates so you never have to.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="how-heading">
      <div className="container">
        <h2 id="how-heading">How it works</h2>
        <ol className="steps">
          {steps.map((step) => (
            <li className="card step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
