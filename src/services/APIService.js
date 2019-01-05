import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    (process.env.VUE_APP_API_ENDPOINT ? process.env.VUE_APP_API_ENDPOINT : '') +
    '/api/',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
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
  getRefuelRecords() {
    return apiClient.get('/fuel');
  },
  postFuelRecord(data) {
    console.log(data);
    return apiClient.post('/fuel/submit', data);
  }
};
