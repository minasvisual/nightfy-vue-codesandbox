<template>
  <div v-if="showModal">
    <transition name="fade">
      <div
        class="modal-mask"
        name="modal"
        data-backdrop="static"
        tabindex="-1"
        role="dialog"
        aria-labelledby="eventModal"
        aria-hidden="true"
      >
        <div class="modal-wrapper">
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content" v-if="!event.id">
              <div class="col-12 d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <div class="modal-content" v-else-if="event.id">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" v-text="event.title"></h5>
                <button type="button" class="close" @click="hideEvent(event)">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row p-2">
                  <div class="col-12 col-md-4 text-center mb-2">
                    <img
                      v-if="event.cover"
                      v-bind:src="event.cover"
                      v-bind:title="event.title"
                      v-bind:alt="event.title"
                      class="img-thumbnail"
                    >
                  </div>
                  <div class="col-12 col-md-7 text-left">
                    <h1 class="h5">
                      <i class="fa fa-calendar-alt mr-2"></i>
                      <span v-once>{{ moment(event.initdate).format("DD/MM/YYYY") }}</span>
                    </h1>

                    <p class="mb-2">
                      <i class="fa fa-info mr-2"></i>
                      <span v-text="event.info"></span>
                    </p>
                    <p>
                      <i class="fa fa-location-arrow mr-1"></i>
                      <span v-text="event.address"></span>
                    </p>
                    <p>
                      <i class="fa fa-map-marker-alt mr-1"></i>
                      <span v-text="event.local"></span>
                    </p>
                    <p class="mb-2" v-if="event.age">
                      <i class="fa fa-child mr-1"></i>
                      <span v-text="event.age"></span>
                    </p>
                    <p class="mb-2">
                      <i class="fa fa-ticket-alt mr-1"></i>
                      <a :href="event.link" target="_blank" v-text="event.provider"></a>
                    </p>
                    <br>
                    <p v-if="event.categories">
                      <i class="fa fa-list-ul mr-1"></i>
                      <span v-text="event.categories"></span>
                    </p>
                  </div>
                  <div class="col-1 d-none d-md-block">
                    <a href="https://www.hostgator.com.br/19556-128-1-696.html" target="_blank">
                      <img
                        style="border:0px;width:100%;height:auto"
                        src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png"
                        width="120"
                        height="600"
                        alt
                      >
                    </a>
                  </div>
                  <div class="col-12 mt-2 text-center">
                    <a href="http://bit.ly/Cursoonlineeprofissional" target="_blank">
                      <img src="assets/ads/unhas-ads.png" alt style="height:90px">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "EventDetail",
  data: function() {
    return {
      showModal: false
    };
  },
  computed: {
    event: function() {
      return this.$store.state.event;
    },
    config: function() {
      return this.$store.state.config;
    }
  },
  created() {
    var self = this;
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setEvent" || mutation.type === "getEventUrl") {
        self.showEvent();
      }
    });
  },
  methods: {
    showEvent() {
      this.showModal = true;
      this.$store.dispatch(
        "sendView",
        "/event/" + encodeURIComponent(this.event.title)
      );
    },
    openExternal: function(link) {
      window.open(link, "_blank");
    },
    hideEvent: function(evt) {
      this.showModal = false;
      this.$store.state.event = {};
      if (this.$route.path !== "/") this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
