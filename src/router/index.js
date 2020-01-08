import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import { isLoggedIn } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue")
  },
  {
    path: "/not-authorized",
    name: "notauthorized",
    component: () => import("../views/NotAuthorized.vue")
  },
  {
    path: "/callback",
    name: "callback",
    component: () => import("../views/Callback.vue")
  },
  {
    path: "/secret",
    name: "secret",
    beforeEnter: requireAuth,
    component: () => import("../views/Secret.vue")
  }
];

function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: "/not-authorized"
    });
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
