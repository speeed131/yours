// https://next.router.vuejs.org/guide/

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import WordList from "@/pages/word/WordList.vue";
import WordListToRemember from "@/pages/word/WordListToRemember.vue";
import DailyList from "@/pages/daily/DailyList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: DefaultLayout,
    children: [
      //https://next.router.vuejs.org/guide/essentials/nested-routes.html
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
        component: () => import(/* webpackChunkName: "about" */ "@/pages/About.vue"),
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
