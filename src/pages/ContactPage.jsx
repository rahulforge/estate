import { Helmet } from 'react-helmet-async';
import { LeadForm } from '../components/property/LeadForm';

export function ContactPage() {
  return (
    <section className="page-section">
      <Helmet>
        <title>Contact | EstateFlow</title>
        <meta name="description" content="Contact EstateFlow for property support, site visits, and investment consultation." />
      </Helmet>
      <div className="container property-detail-grid">
        <div className="card contact-copy">
          <p className="eyebrow">Contact us</p>
          <h1>Let’s talk about your next property move</h1>
          <p>Use the form to request a callback, site visit, or curated recommendations based on your budget and location preferences.</p>
          <iframe
            title="Office map"
            src={import.meta.env.VITE_GOOGLE_MAPS_EMBED}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <LeadForm propertyName="general enquiry" />
      </div>
    </section>
  );
}
