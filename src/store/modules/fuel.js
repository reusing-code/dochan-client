import APIService from '@/services/APIService.js';

export default {
  namespaced: true,
  state: { records: [], recordsTotal: 0, record: {} },
  mutations: {
    ADD_FUEL_RECORD(state, fuelRecord) {
      state.records.push(fuelRecord);
    },
    SET_FUEL_RECORDS(state, fuelRecords) {
      state.records = fuelRecords;
    },
    SET_FUEL_RECORDS_TOTAL(state, recordsTotal) {
      state.recordsTotal = recordsTotal;
    },
    SET_FUEL_RECORD(state, fuelRecord) {
      state.record = fuelRecord;
    }
  },
  actions: {
    addRecord({ commit, dispatch }, fuelRecord) {
      return APIService.postFuelRecord(fuelRecord)
        .then(() => {
          commit('ADD_FUEL_RECORD', fuelRecord);
          const notification = {
            type: 'success',
            message: 'Your fuel record has been added!'
          };
          dispatch('notification/add', notification, { root: true });
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message:
              'There was a problem adding your fuel record: ' + error.message
          };
          dispatch('notification/add', notification, { root: true });
          throw error;
        });
    },
    fetchRecords({ commit, dispatch }, { perPage, page }) {
      APIService.getFuelRecords(perPage, page)
        .then(response => {
          commit(
            'SET_FUEL_RECORDS_TOTAL',
            parseInt(response.headers['x-total-count'])
          );
          commit('SET_FUEL_RECORDS', response.data);
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message:
              'There was a problem fetching fuel records: ' + error.message
          };
          dispatch('notification/add', notification, { root: true });
        });
    },
    fetchRecord({ commit, getters, dispatch }, id) {
      var record = getters.getRecordById(id);

      if (record) {
        commit('SET_FUEL_RECORD', record);
      } else {
        APIService.getFuelRecord(id)
          .then(response => {
            commit('SET_FUEL_RECORD', response.data);
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message:
                'There was a problem fetching fuel record: ' + error.message
            };
            dispatch('notification/add', notification, { root: true });
          });
      }
    }
  },
  getters: {
    getRecordById: state => id => {
      return state.records.find(record => record.id === id);
    }
  }
};
