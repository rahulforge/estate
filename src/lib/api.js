import { seedProperties } from '../data/seed';
import { hasSupabaseEnv, storageBucket, supabase } from './supabase';
import { slugify } from './utils';

const normalizeProperty = (item) => ({
  ...item,
  images: Array.isArray(item.images) ? item.images : item.images ? JSON.parse(item.images) : [],
  amenities: Array.isArray(item.amenities) ? item.amenities : item.amenities ? JSON.parse(item.amenities) : [],
});

export async function getProperties(filters = {}) {
  if (!hasSupabaseEnv) return filterProperties(seedProperties, filters);
  let query = supabase.from('properties').select('*').order('created_at', { ascending: false });
  if (filters.location) query = query.ilike('location', `%${filters.location}%`);
  if (filters.property_type) query = query.eq('property_type', filters.property_type);
  if (filters.minPrice) query = query.gte('price', Number(filters.minPrice));
  if (filters.maxPrice) query = query.lte('price', Number(filters.maxPrice));
  const { data, error } = await query;
  if (error) throw error;
  return data.map(normalizeProperty);
}

function filterProperties(list, filters) {
  return list.filter((item) => {
    const matchesLocation = !filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.property_type || item.property_type === filters.property_type;
    const matchesMin = !filters.minPrice || item.price >= Number(filters.minPrice);
    const matchesMax = !filters.maxPrice || item.price <= Number(filters.maxPrice);
    return matchesLocation && matchesType && matchesMin && matchesMax;
  });
}

export async function getFeaturedProperties() {
  const properties = await getProperties();
  return properties.filter((item) => item.featured).slice(0, 3);
}

export async function getPropertyBySlug(slug) {
  if (!hasSupabaseEnv) return seedProperties.find((item) => item.slug === slug);
  const { data, error } = await supabase.from('properties').select('*').eq('slug', slug).single();
  if (error) throw error;
  return normalizeProperty(data);
}

export async function submitLead(payload) {
  if (!hasSupabaseEnv) return { data: payload, error: null };
return supabase.from('leads').insert([payload]).select().single();}

export async function getDashboardAnalytics() {
  if (!hasSupabaseEnv) return { totalProperties: seedProperties.length, totalLeads: 0 };
  const [{ count: totalProperties }, { count: totalLeads }] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
  ]);
  return { totalProperties: totalProperties || 0, totalLeads: totalLeads || 0 };
}

export async function getLeads() {
  if (!hasSupabaseEnv) return [];
  const { data, error } = await supabase
    .from('leads')
    .select('id,name,phone,message,property_name,created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveProperty(payload, files = []) {
  if (!hasSupabaseEnv) throw new Error('Add Supabase environment variables before using admin write actions.');
  let uploadedUrls = payload.images || [];
  if (files.length) {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from(storageBucket).upload(fileName, file, { upsert: true });
        if (error) throw error;
        const { data } = supabase.storage.from(storageBucket).getPublicUrl(fileName);
        return data.publicUrl;
      })
    );
    uploadedUrls = [...uploadedUrls, ...uploads];
  }
  const property = {
    ...payload,
    slug: payload.slug || slugify(payload.title),
    images: uploadedUrls,
    hero_image: uploadedUrls[0] || payload.hero_image || '',
    amenities: Array.isArray(payload.amenities) ? payload.amenities : payload.amenities.split(',').map((item) => item.trim()).filter(Boolean),
    featured: Boolean(payload.featured),
    only_few_left: Boolean(payload.only_few_left),
    area_sqft: Number(payload.area_sqft),
    price: Number(payload.price),
  };

  if (payload.id) {
    const { data, error } = await supabase.from('properties').update(property).eq('id', payload.id).select().single();
    if (error) throw error;
    return normalizeProperty(data);
  }

  const { data, error } = await supabase.from('properties').insert(property).select().single();
  if (error) throw error;
  return normalizeProperty(data);
}

export async function deleteProperty(id) {
  if (!hasSupabaseEnv) throw new Error('Add Supabase environment variables before using admin write actions.');
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) throw error;
}
