<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">
        Error: document not found
      </div>
      
    </template>
    <template v-else="">
      <template v-if="document">
        <p>Document: {{document.filename}}</p>
      </template>
      <template v-else>
        <p>... Loading ... </p>
      </template>
    </template>
  </div>
</template>

<script>
import DocumentService from '@/services/DocumentService.js';
export default {
  props: ['id'],
  data() {
    return {
      document: null,
      error: null
    };
  },
  created() {
    DocumentService.getDocument(this.id)
      .then(response => {
        this.document = response.data;
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
