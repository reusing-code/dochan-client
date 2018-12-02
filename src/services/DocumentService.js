import axios from 'axios';

const apiClient = axios.create({
  baseURL: `/api/`,
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
  }
};
