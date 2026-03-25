import { Link } from 'react-router-dom';
import { BedDouble, Bath, MapPin, Ruler, Sparkles } from 'lucide-react';
import { currency, formatPropertyType } from '../../lib/utils';

export function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img src={property.hero_image} alt={property.title} loading="lazy" />
        {property.only_few_left && <span className="badge-urgent"><Sparkles size={14} /> Only few properties left</span>}
      </div>
      <div className="property-card-body">
        <div className="property-meta-row">
          <span className="chip">{formatPropertyType(property.property_type)}</span>
          <span className="price">₹ {currency(property.price)}</span>
        </div>
        <h3>{property.title}</h3>
        <p className="location"><MapPin size={16} /> {property.location}</p>
        <div className="property-stats">
          <span><Ruler size={16} /> {property.area_sqft} sq ft</span>
          {property.bedrooms ? <span><BedDouble size={16} /> {property.bedrooms} Beds</span> : null}
          {property.bathrooms ? <span><Bath size={16} /> {property.bathrooms} Baths</span> : null}
        </div>
        <p>{property.description}</p>
        <Link className="button button-primary" to={`/property/${property.slug}`}>View details</Link>
      </div>
    </article>
  );
}
