<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">
        Error: no documents found
      </div>
      
    </template>
    <template v-else="">
      <ul class="list-group">
        <DocumentItem v-for="document in documents" :key="document.id" :document="document"/>
      </ul>
    </template>
  </div>
</template>

<script>
import DocumentService from '@/services/DocumentService.js';
import DocumentItem from '@/components/DocumentItem.vue';
export default {
  name: 'DocumentList',
  components: { DocumentItem },
  data() {
    return {
      documents: null,
      error: null
    };
  },
  props: ['query'],
  created() {
    this.loadData();
  },
  watch: {
    query: function() {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      DocumentService.getDocuments(this.query)
        .then(response => {
          this.documents = response.data;
        })
        .catch(error => {
          this.error = error;
          console.log('There was an error:', error.response);
        });
    }
  }
};
</script>

<style scoped>
</style>
