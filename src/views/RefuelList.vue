<template>
  <div>
    <template v-if="error">
      <div class="alert alert-danger" role="alert">Error: no fuel records found</div>
    </template>
    <template v-else-if="fuel.records">
      <b-table striped hover :fields="fields" :items="fuel.records">
        <template
          slot="costCent"
          slot-scope="data"
        >{{Math.floor(data.value / 100)}}.{{(data.value % 100).toString().padStart(2, '0')}} €</template>
        <template slot="drivenKM" slot-scope="data">{{data.value}} km</template>
        <template slot="fuelKG" slot-scope="data">{{data.value}} kg</template>
        <template slot="location" slot-scope="data">
          <a
            v-if="data.value != null"
            :href="`https://www.google.com/maps/search/?api=1&query=${data.value}`"
          >Location</a>
          <div v-else>-</div>
        </template>
      </b-table>
      <template v-if="page != 1">
        <router-link :to="{ name: 'refuel-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
        <template v-if="hasNextPage">|</template>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'refuel-list', query: { page: page + 1 } }"
        rel="next"
      >Next Page</router-link>
    </template>
    <template v-else>No fuel records available</template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RefuelList',
  components: {},
  data() {
    return {
      fields: [
        {
          key: 'date',
          label: 'Datum',
          formatter: value => {
            var d = new Date(value);
            return d.toLocaleString('de-DE');
          }
        },
        { key: 'costCent', label: 'Kosten' },
        {
          key: 'drivenKM',
          label: 'km'
        },
        {
          key: 'fuelKG',
          label: 'CNG'
        },
        {
          key: 'pricePerKG',
          label: 'Preis <div class="small">(pro kg)</div>',
          formatter: (value, key, item) => {
            return `${(item.costCent / item.fuelKG / 100).toFixed(3)}`;
          }
        },
        {
          key: 'consumption',
          label: 'Verbrauch <div class="small">(kg/100km)</div>',
          formatter: (value, key, item) => {
            return `${((item.fuelKG / item.drivenKM) * 100).toFixed(2)}`;
          }
        },
        {
          key: 'location',
          label: 'Ort',
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
      error: null,
      perPage: 10
    };
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.fuel.recordsTotal > this.page * this.perPage;
    },
    ...mapState(['fuel'])
  }
};
</script>

<style scoped>
</style>
