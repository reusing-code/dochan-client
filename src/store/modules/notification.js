export default {
  namespaced: true,
  nextId: 1,
  state: { notifications: [] },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: this.nextId++
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    }
  },
  actions: {
    add({ commit }, notification) {
      commit('PUSH', notification);
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove);
    }
  }
};
