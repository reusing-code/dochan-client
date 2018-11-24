<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">
        Error: no documents found
      </div>
      
    </template>
    <template v-else="">
      <ul class="list-group">
        <li v-for="document in documents" :key="document.id" class="list-group-item">
          <router-link :to="{ name: 'document-show', params: { id: document.id } }">{{document.filename}}</router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import DocumentService from '@/services/DocumentService.js';
export default {
  data() {
    return {
      documents: null,
      error: null
    };
  },
  created() {
    DocumentService.getDocuments()
      .then(response => {
        this.documents = response.data;
      })
      .catch(error => {
        this.error = error;
        console.log('There was an error:', error.response);
      });
  }
};
</script>

<style scoped>
</style>
