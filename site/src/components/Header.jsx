import { useState } from 'react';

const links = [
  { href: '#packages', label: 'Packages' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="#top" onClick={close}>Everywright</a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="menu-icon" />
        </button>

        <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary btn-small" href="#contact" onClick={close}>
            Get a free demo
          </a>
        </nav>
      </div>
    </header>
  );
}
