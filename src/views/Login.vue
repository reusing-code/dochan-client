<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Username:" label-for="userInput" horizontal>
        <b-form-input id="userInput" type="text" v-model="name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="pwInput" horizontal>
        <b-form-input id="pwInput" type="text" v-model="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import APIService from '@/services/APIService.js';
export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      APIService.createSession(this.password).then(() => {
        this.$router.push({ name: 'home' });
      });
    }
  }
};
</script>

<style scoped>
</style>
