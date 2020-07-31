<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">
        <img src="/assets/images/nome-nightfy.png" alt style="height: 23px;">
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleBtn = !toggleBtn"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" :style="{'display': toggleBtn ?'block':'none'}">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
        <form class="form-inline mt-2 mt-md-0">
          <div class="input-group-sm d-inline-flex col-12 col-sm-auto p-0 pb-2 pr-sm-2 pb-sm-0">
            <div class="input-group-prepend col-2">
              <span class="input-group-text bg-transparent text-white border-0 pl-0">
                <i class="fa fa-calendar-alt"></i>
              </span>
            </div>
            <input
              class="form-control-sm mr-sm-2 bg-transparent text-white col-5"
              type="date"
              style="border:1px solid #999"
              placeholder="Date ate"
              aria-label="Buscar por Data Fim"
              v-model="filter.initdate"
            >
            <input
              class="form-control-sm mr-sm-2 bg-transparent text-white col-5"
              type="date"
              style="border:1px solid #999"
              placeholder="Date ate"
              aria-label="Buscar por Data Fim"
              v-model="filter.enddate"
            >
          </div>
          <div class="form-row col-12 col-sm-auto p-0 pb-2 pr-sm-2 pb-sm-0">
            <select
              class="form-control-sm mr-sm-2 bg-transparent text-white col-12 col-sm-auto"
              placeholder="Search"
              v-model="filter.city"
            >
              <option :value="undefined" selected class="bg-dark">
                <i class="fa fa-location-arrow"></i> Qualquer Cidade
              </option>
              <option
                v-for="city in cities"
                v-bind:id="city"
                v-bind:value="city.city"
                v-text="city.city"
                :key="city.city"
                class="bg-dark"
              ></option>
            </select>
          </div>
          <div class="form-row col-12 col-sm-auto p-0 pb-2 pr-sm-2 pb-sm-0">
            <input
              class="form-control-sm mr-sm-2 bg-transparent text-white col col-sm-auto"
              type="text"
              style="border:1px solid #999"
              placeholder="Buscar por título"
              aria-label="Buscar por título"
              v-model="filter.title"
            >
            <button
              class="btn btn-sm btn-outline-danger my-2 my-sm-0 col col-sm-auto"
              type="button"
              v-if="filter.title"
              @click="filter.title = ''"
            >X</button>
          </div>
          <div class="form-row col-12 col-sm-auto p-0">
            <button
              class="btn btn btn-sm btn-outline-light my-2 my-sm-0 col-12 col-sm-auto"
              type="button"
              @click="filterEvents(filter)"
            >Buscar</button>
          </div>
        </form>
      </div>
    </nav>

    <div
      class="alert"
      v-if="alert && alert.message"
      v-text="alert.message"
      :class="{ [alert.status]: (alert && alert.status), 'alert-success': (!alert.status) }"
    ></div>
  </header>
</template>

<script>
import Vue from "vue";
import moment from "moment";

Vue.prototype.moment = moment;

export default {
  name: "Header",
  data: function() {
    return {
      toggleBtn: false,
      cities: [],
      today: moment(),
      tomorrow: moment().add(1, "days"),
      proximos: moment().add(2, "days")
    };
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    alert() {
      return this.$store.state.alert;
    },
    config() {
      return this.$store.state.config;
    }
  },
  mounted: function() {
    //var self = this;
    this.getCities("");
  },
  methods: {
    filterEvents: function(filter) {
      this.$store.commit("setStateAction", { filter });
    },
    getCities: function(qr) {
      var self = this;
      qr =
        qr.indexOf("initdate,gt") > -1
          ? qr
          : "filter=initdate,gt," + moment().format("YYYY-MM-DD");
      //return fetch( apiroot+'/records/events_dev?include=city&'+qr)
      return fetch(self.config.apiRoot + "cities?" + qr)
        .then(data => data.json())
        .then(json => (self.cities = json))
        .catch(console.log);
    }
  }
};
</script>
<style scoped>
/* .navbar-toggler:focus ~ #navbarCollapse {
  display: block !important;
} */
</style>

