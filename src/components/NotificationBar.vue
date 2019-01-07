<template>
  <b-alert
    dismissible
    @dismissed="removeNotification()"
    :variant="notificationVariant"
    show
  >{{ notification.message }}</b-alert>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  beforeDestroy() {},
  computed: {
    notificationVariant() {
      if (this.notification.type === 'error') {
        return 'danger';
      } else {
        return this.notification.type;
      }
    }
  },
  methods: {
    removeNotification() {
      this.remove(this.notification);
    },
    ...mapActions('notification', ['remove'])
  }
};
</script>

<style scoped>
</style>
