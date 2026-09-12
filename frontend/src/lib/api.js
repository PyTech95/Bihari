import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, headers: { 'Content-Type': 'application/json' } });

// Guards against misconfigured backend URLs (e.g. on a VPS) where a request may
// resolve to the SPA and return HTML instead of a JSON array, which would crash
// components that call .slice()/.map() on the result.
const asArray = (data) => (Array.isArray(data) ? data : []);

export async function getVessels(params = {}) {
  const { data } = await api.get('/vessels', { params });
  return asArray(data);
}
export async function getNews() {
  const { data } = await api.get('/news');
  return asArray(data);
}
export async function getNewsBySlug(slug) {
  const { data } = await api.get(`/news/${slug}`);
  return data;
}
export async function getCaseStudies() {
  const { data } = await api.get('/case-studies');
  return asArray(data);
}
export async function getCaseStudy(slug) {
  const { data } = await api.get(`/case-studies/${slug}`);
  return data;
}
export async function submitQuote(payload) {
  const { data } = await api.post('/quotes', payload);
  return data;
}
export async function submitContact(payload) {
  const { data } = await api.post('/contact', payload);
  return data;
}
export async function subscribeNewsletter(email) {
  const { data } = await api.post('/newsletter', { email });
  return data;
}
export async function getAdminSubmissions() {
  const { data } = await api.get('/admin/submissions');
  return data;
}
