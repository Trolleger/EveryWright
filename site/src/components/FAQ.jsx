const questions = [
  {
    q: 'Is the demo really free?',
    a: 'Yes. We build a demo of your new site at no cost. If you don\'t like it, you owe nothing.',
  },
  {
    q: 'How can you build a site in 7 days?',
    a: 'We use modern tools, including AI, to handle the slow parts, and we focus on what your business actually needs. A person checks every page before it goes live.',
  },
  {
    q: 'What do I need to give you?',
    a: "Your logo if you have one, a few photos, and your services, menu or prices. We'll handle the rest, including writing the text.",
  },
  {
    q: 'What does the care plan include?',
    a: 'Hosting, small updates like new prices, hours or photos, keeping your Google Business Profile up to date, and fixing anything that breaks.',
  },
  {
    q: 'Do I own my website?',
    a: "Yes. Once it's paid for, it's yours.",
  },
  {
    q: 'What if I already have a website?',
    a: "We'll build a demo of a better version. If you like it, we can move your domain and set everything up for you.",
  },
];

export default function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-heading">
      <div className="container narrow">
        <h2 id="faq-heading">Questions</h2>
        <div className="faq-list">
          {questions.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
