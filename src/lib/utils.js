export const currency = (value) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Number(value || 0));

export const slugify = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const formatPropertyType = (value = '') =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const buildWhatsAppUrl = (phone, message) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const classNames = (...classes) => classes.filter(Boolean).join(' ');
