<template>
  <section class="container-fluid d-flex flex-wrap p-0 mt-3">
    <h5 class="col-12 text-center mt-2">
      Eventos Próximos
      <small v-if="(filter && filter.city)">({{ filter.city }})</small>
    </h5>
    <div class="col-12 d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="col-md-12" v-show="events.length == 0 && !isLoading">
      <h4 align="center">Não há resultados para a pesquisa.</h4>
    </div>

    <div class="row">
      <a
        class="col-12 col-md-1"
        href="https://www.hostgator.com.br/19556-128-1-696.html"
        target="_blank"
      >
        <img
          class="d-none d-md-block"
          style="border:0px;width:100%;height:auto"
          src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png"
          width="120"
          height="600"
          alt
        >
        <img
          class="d-block d-md-none my-2 w-100"
          src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png"
          alt
        >
      </a>
      <div class="col-12 col-md-10 d-flex flex-wrap">
        <div
          v-show="(events.length > 0 && !isLoading)"
          class="col-md-3 col-sm-12 event mb-3"
          v-for="evt in events"
          :key="evt.id"
        >
          <div
            class="card"
            style="border-top:1px solid #ccc"
            @click="showEvent(evt)"
            v-add-class-hover="'shadow'"
          >
            <div
              class="card-img-top"
              :style="'background: url('+evt.cover+') center/cover no-repeat;height:200px'"
            ></div>
            <div class="card-body">
              <b v-if="evt" v-text="evt.title" class="card-title"></b>
              <div class="small d-block py-1">
                <i class="fa fa-calendar-alt mr-2"></i>
                <span v-if="evt" v-once>{{ moment(evt.initdate).format("DD/MM/YYYY") }}</span>
              </div>
              <div class="small d-block py-1">
                <i class="fa fa-location-arrow mr-2"></i>
                <span v-if="evt" v-text="evt.city"></span>
              </div>
              <div class="small d-block py-1">
                <i class="fa fa-map-marker-alt mr-2"></i>
                <span v-if="evt" v-text="evt.local"></span>
              </div>
            </div>
          </div>
          <div class="btn-group mr-2 shadow" role="group" aria-label="Second group">
            <button type="button" class="btn btn-outline-secondary" @click="showEvent(evt)">
              <i class="fa fa-eye"></i>
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="share(evt)">
              <i class="fa fa-share-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-secondary">
              <i class="fa fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
      <a
        class="col-12 col-md-1"
        href="https://www.hostgator.com.br/19556-128-1-696.html"
        target="_blank"
      >
        <img
          class="d-none d-md-block"
          style="border:0px;width:100%;height:auto"
          src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png"
          width="120"
          height="600"
          alt
        >
        <img
          class="d-block d-md-none my-2 w-100"
          src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png"
          alt
        >
      </a>
    </div>

    <div class="col-md-12" v-if="events && events.length > 0">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm justify-content-center">
          <li class="page-item" v-if="actualPage <= 1">
            <a class="page-link" href="#" @click="filterEvents(actualPage-1)">Anterior</a>
          </li>
          <li
            class="page-item d-none d-md-block d-lg-block"
            v-for="pg in page"
            :class="{'active':actualPage == pg}"
            :key="pg"
          >
            <a class="page-link" href="#" @click="filterEvents(pg)" v-text="pg"></a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click="filterEvents(actualPage+1)">Próximo</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="col-12 d-none d-md-block mt-2 text-center">
      <a href="http://bit.ly/Cursoonlineeprofissional" target="_blank">
        <img src="assets/ads/unhas-ads.png" alt style="height:90px">
      </a>
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import moment from "moment";

Vue.prototype.moment = moment;

export default {
  name: "Events",
  data: function() {
    return {
      today: moment(),
      tomorrow: moment().add(1, "days"),
      proximos: moment().add(2, "days"),
      isLoading: false,
      actualPage: 1,
      totalPages: 12,
      events: [],
      page: []
    };
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    config() {
      return this.$store.state.config;
    }
  },
  created() {
    var self = this;
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setStateAction") {
        console.log(`Updating to state.filter`, state);
        self.filterEvents();
      }
    });
  },
  mounted: function() {
    //var self = this;
    this.getEvents();

    if (!this.event && this.$route.params.type && this.$route.params.name) {
      if (this.$route.params.type === "event")
        this.$store.commit("getEventUrl", this.$route);
      else
        this.$store.commit("setStateAction", {
          filter: { city: this.$route.params.name }
        });
    }
  },
  methods: {
    filterEvents: function(page) {
      var filter = this.filter;
      this.actualPage = page || this.actualPage;

      var qr = Object.keys(filter).reduce(function(prev, i) {
        if (i === "initdate")
          return (prev +=
            "&filter=" +
            i +
            ",gt," +
            moment(filter.initdate).format("YYYY-MM-DDT00:00:00"));
        else if (i === "enddate")
          return (prev +=
            "&filter=" +
            i +
            ",lt," +
            moment(filter.enddate).format("YYYY-MM-DDT23:59:59"));
        else
          return filter[i]
            ? (prev += "&filter=" + i + ",cs," + filter[i])
            : prev;
      }, "");
      this.getEvents(qr);
    },
    getEvents: function(qr = "") {
      var self = this;
      this.setLoad(true);
      var todayFilter =
        qr.indexOf("initdate,gt") > -1
          ? ""
          : "filter=initdate,gt," + this.proximos.format("YYYY-MM-DD");
      return fetch(
        this.config.apiRoot +
          "v1/records/events_dev?order=initdate,asc&page=" +
          `${this.actualPage || 1},${this.totalPages}&exclude=desc&` +
          `${todayFilter}&order=initdate,asc&page=${this.actualPage || 1},${
            this.totalPages
          }&exclude=desc${qr || ""}`
      )
        .then(data => data.json())
        .then(json => {
          self.events = json.records;
          this.pagination(json.results || 1);
          self.setLoad(false);
          return json;
        });
    },
    pagination: function(numPages) {
      this.page = [];
      var pages = parseInt(numPages / this.totalPages, 10);
      for (var i = 1; i <= pages; i++) {
        this.page.push(i);
      }
    },
    showEvent(evt) {
      console.log("event", evt);
      this.$store.state.event = evt;
      this.$store.commit("setEvent", evt);
    },
    setLoad: function(load) {
      var self = this;
      this.isLoading = load || false;
      setTimeout(() => (self.isLoading = false), 15000);
    },
    share: function(evt) {
      var textShare = {
        title: "Nightfy | " + evt.title,
        text: "Dê uma olhada nesse evento!",
        url: "https://nightfy.com.br/event/" + encodeURIComponent(evt.title)
      };
      try {
        if (navigator.share) {
          navigator.share(textShare).then(
            () =>
              (this.$store.state.alert = {
                message: "Compartilhado com sucesso!"
              })
          );
        } else {
          var w = 500;
          var h = 500;
          var left = Number(window.innerWidth / 2 - w / 2);
          var tops = Number(window.innerHeight / 2 - h / 2);
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              textShare.url +
              "&quote=" +
              textShare.title,
            "_blank",
            `toolbar=yes,scrollbars=yes,resizable=yes,top=${tops},left=${left},width=${w},height=${h}`
          );
        }
      } catch (err) {
        console.log(err);
        this.$store.state.alert = {
          status: "alert-danger",
          message: "Erro ao compartilhar, tente novamente!"
        };
      }
    }
  }
};
</script>
<style scoped>
.pagination li a {
  color: #000;
}
.pagination li.active a {
  color: #fff !important;
  background: #333 !important;
  border-color: #333 !important;
}
.event .card.shadow {
  border: 0px !important;
  transition: all 0.5s;
}
.event .btn-group {
  margin-top: -20px;
  background: #fff;
}
.event .btn-group .btn {
  border: 0px;
  padding: 3px 10px;
}
</style>
