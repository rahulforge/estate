import { Menu, PhoneCall, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { classNames } from '../../lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Home', '/'],
    ['Properties', '/properties'],
    ['Contact', '/contact'],
    ['Admin', '/admin/login'],
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/">
          <img className="brand-logo" src="/estate-professional-logo.svg" alt="Estate Professional logo" />
          <span className="brand-copy">
            <strong>Estate Professional</strong>
            <small>Luxury Property Advisors</small>
          </span>
        </Link>
        <nav className={classNames('nav-links', open && 'is-open')}>
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <a className="nav-cta" href="tel:+919999999999">
            <PhoneCall size={18} /> Call Now
          </a>
        </nav>
        <button className="menu-btn" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
