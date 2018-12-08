<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">Error: no fuel records found</div>
    </template>
    <template v-else-if="fuelRecords">
      <b-table striped hover :fields="fields" :items="fuelRecords">
        <template
          slot="costCent"
          slot-scope="data"
        >{{Math.floor(data.value / 100)}}.{{(data.value % 100).toString().padStart(2, '0')}} €</template>
        <template slot="location" slot-scope="data">
          <a
            v-if="data.value != null"
            :href="`https://www.google.com/maps/search/?api=1&query=${data.value}`"
          >Location</a>
          <div v-else>-</div>
        </template>
      </b-table>
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
      fields: [
        {
          key: 'date',
          formatter: value => {
            var d = new Date(value);
            return d.toLocaleString('de-DE');
          }
        },
        { key: 'costCent' },
        {
          key: 'location',
          formatter: (value, key, item) => {
            if (item === undefined || item === null) {
              return null;
            }
            var lat = item.lat;
            var lon = item.lon;
            if (lat != '0' && lon != '0') {
              return `${lat},${lon}`;
            } else {
              return null;
            }
          }
        }
      ],
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
