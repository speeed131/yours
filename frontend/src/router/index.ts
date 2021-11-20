// https://next.router.vuejs.org/guide/

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import WordList from "@/pages/word/WordList.vue";
import WordListToRemember from "@/pages/word/WordListToRemember.vue";
import DailyList from "@/pages/daily/DailyList.vue";
import Login from "@/pages/beforelogin/login.vue";
import Register from "@/pages/beforelogin/register.vue";
import Landing from "@/pages/beforelogin/landing.vue";
import { api } from "@/api/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/login",
    beforeEnter: (to, from) => {
      // reject the navigation
      console.log(api.auth.getUserMe());
      if (!api.auth.getUserMe()) return "/login";
    },
    component: DefaultLayout,
    children: [
      //https://next.router.vuejs.org/guide/essentials/nested-routes.htm
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "landing",
        name: "Landing",
        component: Landing,
      },
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/pages/About.vue"),
      },
      {
        path: "words",
        name: "Words",
        component: WordList,
        children: [
          {
            path: "/toRemember",
            name: "WordsToRemember",
            component: WordListToRemember,
          },
        ],
      },
      {
        path: "dailies",
        name: "Dailies",
        component: DailyList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
