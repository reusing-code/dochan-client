<template>
  <li  class="list-group-item">
    <router-link :to="{ name: 'document-show', params: { id: document.id } }">{{document.filename}}</router-link>
  </li>
</template>

<script>
export default {
  props: {
    document: {}
  }
};
</script>

<style scoped>
</style>
