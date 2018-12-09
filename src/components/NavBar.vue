<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">Dochan</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'document-list' }">Documents</b-nav-item>
        <b-nav-item :to="{ name: 'refuel-list' }">Refuel</b-nav-item>
        <b-nav-item :to="{ name: 'refuel-input' }">Refuel New</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="handleSubmit">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            type="text"
            placeholder="Search"
            v-model="searchQuery"
          />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
