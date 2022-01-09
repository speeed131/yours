// https://next.router.vuejs.org/guide/

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import WordList from "@/pages/word/WordList.vue";
import WordsListRemembered from "@/pages/word/WordsListRemembered.vue";
import DailyList from "@/pages/daily/DailyList.vue";
import Login from "@/pages/beforelogin/login.vue";
import Register from "@/pages/beforelogin/register.vue";
import Landing from "@/pages/beforelogin/landing.vue";
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
        path: "words",
        name: "Words",
        component: WordList,
      },
      {
        path: "words/remembered",
        name: "WordsRemembered",
        component: WordsListRemembered,
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

  if (to.name === "Login" || to.name === "Register" || to.name === "Landing") {
    return isSuccess ? "/home" : true;
  }

  return isSuccess ? true : "/login";
});

export default router;
