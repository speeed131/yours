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
import NewWordList from "@/pages/word/NewWordList.vue";
import { api } from "@/api/index";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/login",
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
        component: NewWordList,
        children: [
          // {
          //   path: "/register"
          //   name: "WordsRegister"
          //   component: Word
          // },
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

router.beforeEach(async (to, from) => {
  // reject the navigation
  //@TODO:汚いコードなのでどうにかしたい
  //@TODO: storeの参照も必要か検討余地あり
  // eslint-disable-next-line no-constant-condition
  const isSuccess = await store.dispatch("auth/getUserMe");

  if (to.name === "Login" || to.name === "Register") {
    return isSuccess ? "/home" : true;
  }

  return isSuccess ? true : "/login";
});

export default router;
