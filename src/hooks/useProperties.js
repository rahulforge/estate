import { useEffect, useState } from 'react';
import { getProperties } from '../lib/api';

export function useProperties(filters) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    getProperties(filters)
      .then((data) => {
        if (!ignore) {
          setProperties(data);
          setError('');
        }
      })
      .catch((err) => !ignore && setError(err.message || 'Failed to load properties.'))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [filters?.location, filters?.property_type, filters?.minPrice, filters?.maxPrice]);

  return { properties, loading, error };
}
