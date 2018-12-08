<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">Error: document not found</div>
    </template>
    <template v-else>
      <template v-if="document">
        <p>Document: {{document.filename}}</p>
        <pdf :src="pdfSrc"/>
      </template>
      <template v-else>
        <p>... Loading ...</p>
      </template>
    </template>
  </div>
</template>

<script>
import pdf from 'vue-pdf';
import APIService from '@/services/APIService.js';
export default {
  props: ['id'],
  components: {
    pdf
  },
  data() {
    return {
      document: null,
      error: null,
      pdfSrc: null
    };
  },
  created() {
    APIService.getDocument(this.id)
      .then(response => {
        this.document = response.data;
        this.pdfSrc = `/api/documents/${this.id}/download`;
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
