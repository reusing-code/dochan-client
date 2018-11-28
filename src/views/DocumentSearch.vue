<template>
  <div>
    <form class="form-inline" @submit.prevent="handleSubmit">
      <label class="sr-only" for="inlineFormInputName2">Search</label>
      <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputSearch" placeholder="Search" v-model="searchInput">
      <button type="submit" class="btn btn-primary mb-2">Search</button>
    </form>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">
        Error: no documents found
      </div>
      
    </template>
    <template v-else-if="result && result.results && result.results.length > 0">
      Results: {{result.count}} in {{result.time}}
      <ul class="list-group">
        <DocumentItem v-for="document in result.results" :key="document.id" :document="document"/>
      </ul>
    </template>
    <template v-else="">
      No documents found for: '{{query}}'
    </template>
  </div>
</template>

<script>
import DocumentService from '@/services/DocumentService.js';
import DocumentItem from '@/components/DocumentItem.vue';
export default {
  name: 'DocumentSearch',
  components: { DocumentItem },
  data() {
    return {
      result: null,
      error: null,
      searchInput: ''
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
          this.result = response.data;
          this.error = null;
        })
        .catch(error => {
          this.error = error;
          console.log('There was an error:', error.response);
        });
    },
    handleSubmit() {
      this.$router.push({
        name: 'document-search',
        params: { query: this.searchInput }
      });
    }
  }
};
</script>

<style scoped>
</style>
