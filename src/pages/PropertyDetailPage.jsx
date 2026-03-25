import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { CheckCircle2, MapPin } from 'lucide-react';
import { LeadForm } from '../components/property/LeadForm';
import { getPropertyBySlug } from '../lib/api';
import { buildWhatsAppUrl, currency } from '../lib/utils';

export function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyBySlug(slug).then(setProperty).catch(console.error);
  }, [slug]);

  if (!property) return <section className="page-section container">Loading property...</section>;

  const mapsUrl = property.latitude && property.longitude
    ? `https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`
    : import.meta.env.VITE_GOOGLE_MAPS_EMBED;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const message = `Hi, I am interested in ${property.title} at ₹ ${currency(property.price)}.`;

  return (
    <section className="page-section">
      <Helmet>
        <title>{property.title} | EstateFlow</title>
        <meta name="description" content={property.description} />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL || ''}/property/${property.slug}`} />
      </Helmet>
      <div className="container property-detail-grid">
        <div>
          <div className="gallery-grid">
            {property.images.map((image) => <img key={image} src={image} alt={property.title} loading="lazy" />)}
          </div>
          <div className="card property-copy">
            <p className="eyebrow">{property.property_type}</p>
            <h1>{property.title}</h1>
            <p className="detail-price">₹ {currency(property.price)}</p>
            <p className="location"><MapPin size={16} /> {property.location}</p>
            <p>{property.description}</p>
            <div className="amenities-list">
              {property.amenities.map((item) => <span key={item}><CheckCircle2 size={16} /> {item}</span>)}
            </div>
            <div className="detail-actions">
              <a className="button button-primary" href={buildWhatsAppUrl(whatsappNumber, message)} target="_blank" rel="noreferrer">WhatsApp now</a>
              <a className="button button-secondary" href="#schedule-visit">Schedule visit</a>
            </div>
          </div>
          <div className="card map-card">
            <iframe title="Property location" src={mapsUrl} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <div className="sidebar-stack">
          <LeadForm propertyName={property.title} />
          <div id="schedule-visit"><LeadForm propertyName={property.title} scheduleOnly /></div>
        </div>
      </div>
    </section>
  );
}
