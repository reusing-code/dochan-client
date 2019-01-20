import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    (process.env.VUE_APP_API_ENDPOINT ? process.env.VUE_APP_API_ENDPOINT : '') +
    '/api/',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default {
  getDocument(id) {
    return apiClient.get('/documents/' + id);
  },
  getDocuments(query) {
    if (query && query != '') {
      return apiClient.get('/documents?q=' + query);
    } else {
      return apiClient.get('/documents');
    }
  },
  getFuelRecords(perPage, page) {
    return apiClient.get('/fuel?limit=' + perPage + '&page=' + page);
  },
  getFuelRecord(id) {
    return apiClient.get('/fuel/' + id);
  },
  postFuelRecord(data) {
    console.log(data);
    return apiClient.post('/fuel/submit', data);
  }
};
