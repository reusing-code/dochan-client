<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Datum:" label-for="dateInput" horizontal>
        <b-form-input id="dateInput" type="text" v-model="form.date" required></b-form-input>
      </b-form-group>
      <b-form-group label="Zeit:" label-for="timeInput" horizontal>
        <b-form-input id="timeInput" type="text" v-model="form.time" required></b-form-input>
      </b-form-group>
      <b-form-group label="km Stand:" label-for="kmInput" horizontal>
        <b-form-input id="kmInput" type="number" v-model="form.totalKM" required></b-form-input>
      </b-form-group>
      <b-form-group label="Kosten (Cent):" label-for="costInput" horizontal>
        <b-form-input id="costInput" type="number" v-model="form.costCent" required></b-form-input>
      </b-form-group>
      <b-form-group label="kg*100:" label-for="kgInput" horizontal>
        <b-form-input id="kgInput" type="number" v-model="form.fuelKG" required></b-form-input>
      </b-form-group>
      <b-form-group label="Standort:" label-for="locationInputLat" horizontal>
        <b-form-input id="locationInputLat" type="text" v-model="form.lat" required></b-form-input>
        <b-form-input id="locationInputLon" type="text" v-model="form.lon" required></b-form-input>
      </b-form-group>
      <b-form-group label="km (Benzin):" label-for="ignorekmInput" horizontal>
        <b-form-input id="ignorekmInput" type="number" v-model="form.ignoreKM" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import APIService from '@/services/APIService.js';
export default {
  data() {
    return {
      form: {
        date: '',
        time: '',
        totalKM: '',
        costCent: '',
        fuelKG: '',
        lat: 0,
        lon: 0,
        ignoreKM: 0
      },
      show: true,
      error: null
    };
  },
  created() {
    this.onReset();
  },
  methods: {
    onSubmit() {
      var dateArr = this.form.date.split('.');
      var timeArr = this.form.time.split(':');
      var dateObj = new Date(
        dateArr[2],
        dateArr[1] - 1,
        dateArr[0],
        timeArr[0],
        timeArr[1],
        timeArr[2]
      );
      var result = {};
      result.date = dateObj.toISOString();
      result.lat = this.form.lat;
      result.lon = this.form.lon;
      result.costCent = parseInt(this.form.costCent, 10);
      result.totalKM = parseInt(this.form.totalKM);
      result.fuelKG = this.form.fuelKG / 100;
      result.ignoreKM = this.form.ignoreKM;
      APIService.postFuelRecord(result)
        .then(() => {
          this.error = null;
          this.$router.push({ name: 'refuel-list' });
        })
        .catch(error => {
          this.error = error;
          console.log('There was an error:', error.response);
        });
    },
    onReset() {
      /* Reset our form values */
      var dateTime = new Date();
      this.form.date = dateTime.toLocaleDateString('de-DE');
      this.form.time = dateTime.toLocaleTimeString('de-DE');
      this.form.lat = 0;
      this.form.lon = 0;
      this.totalKM = '';
      this.costCent = '';
      this.fuelKG = '';

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.form.lat = position.coords.latitude;
            this.form.lon = position.coords.longitude;
          },
          error => {
            console.log('No position available: ' + error.message);
          }
        );
      }
    }
  }
};
</script>


<style scoped>
</style>
