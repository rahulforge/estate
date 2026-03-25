import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeIndianRupee, Building2, Search } from 'lucide-react';
import { PropertyCard } from '../components/property/PropertyCard';
import { getFeaturedProperties } from '../lib/api';
import { testimonials } from '../data/seed';

export function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState({ location: '', price: '', property_type: '' });

  useEffect(() => {
    getFeaturedProperties().then(setFeatured).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.location) params.set('location', search.location);
    if (search.price) params.set('maxPrice', search.price);
    if (search.property_type) params.set('property_type', search.property_type);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Estate Professional | Premium Real Estate Platform</title>
        <meta name="description" content="Search premium flats, plots, and commercial spaces with direct lead capture and WhatsApp conversion." />
      </Helmet>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">Modern real estate sales stack</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Find premium property faster. Capture every lead smarter.</motion.h1>
            <p className="hero-copy">Beautiful listing experience for buyers, efficient dashboard for admins, and direct WhatsApp conversion for high-intent enquiries.</p>
            <form className="search-bar card" onSubmit={handleSearch}>
              <div className="search-input"><Search size={18} /><input placeholder="Location" value={search.location} onChange={(e) => setSearch({ ...search, location: e.target.value })} /></div>
              <input type="number" placeholder="Max budget" value={search.price} onChange={(e) => setSearch({ ...search, price: e.target.value })} />
              <select value={search.property_type} onChange={(e) => setSearch({ ...search, property_type: e.target.value })}>
                <option value="">Property type</option>
                <option value="flat">Flat</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
              <button className="button button-primary" type="submit">Search</button>
            </form>
            <div className="hero-cta-row">
              <Link className="button button-primary" to="/properties">Explore listings</Link>
              <Link className="button button-secondary" to="/contact">Talk to advisor</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card"><Building2 size={22} /><strong>Premium inventory</strong><span>Flats, plots, commercial assets</span></div>
            <div className="stat-card"><BadgeIndianRupee size={22} /><strong>High-conversion enquiries</strong><span>Lead forms, WhatsApp, schedule visits</span></div>
            <div className="stat-card"><ArrowRight size={22} /><strong>Admin visibility</strong><span>Property management and lead tracking</span></div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured properties</p>
            <h2>Handpicked investment opportunities</h2>
          </div>
          <Link to="/properties">See all</Link>
        </div>
        <div className="container card-grid">
          {featured.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </section>

      <section className="page-section muted-section">
        <div className="container section-heading"><div><p className="eyebrow">Why buyers convert</p><h2>Built to turn discovery into decisions</h2></div></div>
        <div className="container features-grid">
          <div className="card"><h3>Fast, mobile-first experience</h3><p>Responsive design, clear CTAs, and optimized layouts for on-the-go property browsing.</p></div>
          <div className="card"><h3>Urgency that feels real</h3><p>Highlight limited inventory with “Only few properties left” badges and schedule-visit actions.</p></div>
          <div className="card"><h3>SEO-ready foundation</h3><p>Dynamic page metadata, semantic structure, and clean property slugs for discoverability.</p></div>
        </div>
      </section>

      <section className="page-section">
        <div className="container section-heading"><div><p className="eyebrow">Testimonials</p><h2>What clients say</h2></div></div>
        <div className="container testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.name} className="card testimonial-card">
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
