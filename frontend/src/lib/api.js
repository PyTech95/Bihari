import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, headers: { 'Content-Type': 'application/json' } });

export async function getVessels(params = {}) {
  const { data } = await api.get('/vessels', { params });
  return data;
}
export async function getNews() {
  const { data } = await api.get('/news');
  return data;
}
export async function getNewsBySlug(slug) {
  const { data } = await api.get(`/news/${slug}`);
  return data;
}
export async function getCaseStudies() {
  const { data } = await api.get('/case-studies');
  return data;
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
