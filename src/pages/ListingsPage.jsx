import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { useProperties } from '../hooks/useProperties';

export function ListingsPage() {
  const location = useLocation();
  const defaults = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      location: params.get('location') || '',
      property_type: params.get('property_type') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
    };
  }, [location.search]);

  const [filters, setFilters] = useState(defaults);
  const { properties, loading, error } = useProperties(filters);

  return (
    <section className="page-section">
      <Helmet>
        <title>Property Listings | EstateFlow</title>
        <meta name="description" content="Browse flats, plots, and commercial listings with fast filters and direct enquiry options." />
      </Helmet>
      <div className="container section-heading">
        <div>
          <p className="eyebrow">Property listing</p>
          <h1>Browse available inventory</h1>
        </div>
      </div>
      <div className="container stack-lg">
        <PropertyFilters filters={filters} onChange={setFilters} />
        {loading ? <p>Loading properties...</p> : null}
        {error ? <p>{error}</p> : null}
        <div className="card-grid">
          {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
        {!loading && !properties.length ? <div className="card">No properties match the selected filters.</div> : null}
      </div>
    </section>
  );
}
