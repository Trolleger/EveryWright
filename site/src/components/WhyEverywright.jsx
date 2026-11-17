const reasons = [
  { title: 'See it first.', text: 'You see your new site before you pay a cent.' },
  { title: 'Fast.', text: 'Live in 7 days, not 7 weeks.' },
  { title: 'Fair prices, up front.', text: 'No hidden fees and no confusing quotes.' },
  { title: 'We stick around.', text: 'With a care plan, you text us a change and it\'s done.' },
  { title: 'Local.', text: "We're in Toronto, and we answer our phone." },
  {
    title: 'Built with AI, checked by people.',
    text: 'AI helps us work fast. A real person checks every page.',
  },
];

export default function WhyEverywright() {
  return (
    <section className="section" id="why" aria-labelledby="why-heading">
      <div className="container">
        <h2 id="why-heading">Why Everywright</h2>
        <ul className="reasons">
          {reasons.map((reason) => (
            <li className="reason" key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
