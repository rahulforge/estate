import { Building2, Menu, PhoneCall, ShieldCheck, X } from 'lucide-react';
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
          <span className="brand-mark">
            <Building2 size={24} />
            <ShieldCheck size={14} />
          </span>
          <span>Estate Professional</span>
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
