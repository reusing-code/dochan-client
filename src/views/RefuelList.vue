<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">Error: no fuel records found</div>
    </template>
    <template v-else-if="fuelRecords && fuelRecords.length > 0">
      <b-table striped hover :items="fuelRecords"></b-table>
    </template>
    <template v-else>No fuel records available</template>
  </div>
</template>

<script>
import APIService from '@/services/APIService.js';
export default {
  name: 'RefuelList',
  components: {},
  data() {
    return {
      fuelRecords: null,
      error: null
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      APIService.getRefuelRecords()
        .then(response => {
          this.fuelRecords = response.data;
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
