import Vue from "vue";
import App from "./App.vue";
import { store } from "./vuex/Vuex";
import VueRouter from "vue-router";
import { routes } from "./Routes";
import { hover } from "./directives/hover";

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes // short for `routes: routes`
});

router.afterEach((to) => {
  console.log(to);

  var titulo = "Nightfy | Agenda da diversão";
  if (to.params.type && to.params.type === "event") {
    //store.commit("getEventUrl", to);
    titulo = "Nightfy | Evento " + to.params.name;
    this.$store.dispatch(
      "sendView",
      "/event/" + encodeURIComponent(to.params.name)
    );
  } else if (to.params.type && to.params.type === "city" && to.params.name) {
    // store.commit("setStateAction", {
    //   filter: {
    //     city: to.params.name
    //   }
    // });
    titulo = "Nightfy | Eventos em " + to.params.name;
    this.$store.dispatch(
      "sendView",
      "/city/" + encodeURIComponent(to.params.name)
    );
  }

  document.title = titulo;
});

Vue.use(VueRouter);

Vue.directive(hover[0], hover[1]);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
