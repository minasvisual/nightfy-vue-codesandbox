import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  debug: true,
  state: {
    config: {
      apiRoot: "https://api.nightfy.com.br/index.php/",
      analyticsCode: "UA-51591237-7"
    },
    event: {},
    filter: {},
    user: {},
    alert: {}
  },
  mutations: {
    setStateAction: function(state, values) {
      //console.log("setMessageAction triggered with", state);
      Object.keys(values).map(k => (this.state[k] = values[k]));
    },
    setEvent: function(state, evt) {
      //console.log('setevent', state, evt)
      state.event = evt;
    },
    getEventUrl: function(state, route) {
      state.event = {};
      fetch(
        state.config.apiRoot +
          "v1/records/events_dev?filter=title,eq," +
          route.params.name
      )
        .then(data => data.json())
        .then(json => (state.event = json.records[0] || json));
    }
  },
  getters: {
    filterEvent: function(state) {
      return state.filter;
    }
  },
  actions: {
    sendView: function({ state }, url) {
      if (url && window.ga) {
        window.ga("create", state.config.analyticsCode, "auto");
        window.ga("send", {
          hitType: "pageview",
          page: url
        });
      }
    }
  }
});

export { store };
