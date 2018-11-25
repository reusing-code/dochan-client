<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <b-link to="/" class="navbar-brand">Dochan</b-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active-class">
          <b-link :to="{ name: 'home' }" class="nav-link" exact>Home</b-link> 
        </li>
        <li class="nav-item active-class">
          <b-link :to="{ name: 'document-list' }" class="nav-link" exact>Documents</b-link>
        </li>
        <li class="nav-item active-class">
          <b-link :to="{ name: 'about' }" class="nav-link" exact>About</b-link>
        </li>
      
      </ul>
      <form @submit.prevent="handleSubmit" class="form-inline my-2 my-lg-0">
        <input v-model="searchQuery" class="form-control mr-sm-2" type="search" 
               placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({
        name: 'document-search',
        params: { query: this.searchQuery }
      });
    }
  }
};
</script>

<style scoped>
</style>
