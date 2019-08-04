import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Halal from "@/components/Halal.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/certification",
      name: "certification",
      component: Halal
    }
  ]
});
