<template>
  <div
    class="
      mt-24
      mx-auto
      flex flex-col
      w-full
      max-w-lg
      px-4
      py-8
      bg-white
      rounded-lg
      shadow
      dark:bg-gray-800
      sm:px-6
      md:px-8
      lg:px-10
    "
  >
    <div
      class="
        self-center
        mb-6
        text-xl
        font-light
        text-gray-600
        sm:text-2xl
        dark:text-white
      "
    >
      ログイン
    </div>
    <div class="mt-8">
      <form @submit.prevent="loginUser()">
        <div class="flex flex-col mb-2">
          <div class="flex relative">
            <span
              class="
                rounded-l-md
                inline-flex
                items-center
                px-3
                border-t
                bg-white
                border-l border-b border-gray-300
                text-gray-500
                shadow-sm
                text-sm
              "
            >
              <i class="pi pi-user"></i>
            </span>
            <input
              v-model="username"
              type="text"
              id="sign-in-email"
              class="
                rounded-r-lg
                flex-1
                appearance-none
                border border-gray-300
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-600
                focus:border-transparent
              "
              placeholder="ユーザーネーム"
            />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <div class="flex relative">
            <span
              class="
                rounded-l-md
                inline-flex
                items-center
                px-3
                border-t
                bg-white
                border-l border-b border-gray-300
                text-gray-500
                shadow-sm
                text-sm
              "
            >
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"
                ></path>
              </svg>
            </span>
            <input
              v-model="password"
              type="password"
              id="sign-in-email"
              class="
                rounded-r-lg
                flex-1
                appearance-none
                border border-gray-300
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-600
                focus:border-transparent
              "
              placeholder="パスワード"
            />
          </div>
        </div>
        <div class="flex w-full">
          <button
            type="submit"
            class="
              py-2
              px-4
              bg-yellow-500
              hover:bg-yellow-600
              focus:ring-yellow-400 focus:ring-offset-yellow-100
              text-white
              w-full
              transition
              ease-in
              duration-200
              text-center text-base
              font-semibold
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2
              rounded-lg
            "
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
    <div class="flex items-center justify-center mt-6">
      <a
        href="register"
        class="
          inline-flex
          items-center
          text-xs
          font-thin
          text-center text-gray-500
          hover:text-gray-700
          dark:text-gray-100 dark:hover:text-white
        "
      >
        <span class="ml-2">まだ未登録の方はこちらから</span>
      </a>
    </div>
  </div>
</template>

<script>
import "primeicons/primeicons.css";
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  /**
   @see https://v3.ja.vuejs.org/guide/composition-api-setup.html#%E5%BC%95%E6%95%B0
  */
  name: "login",
  setup(props, context) {
    const store = useStore();
    const username = ref("");
    const password = ref("");

    return {
      username,
      password,
      postUserLogin: (requestData) =>
        store.dispatch("auth/postUserLogin", requestData),
    };
  },
  methods: {
    async loginUser() {
      const requestData = {
        username: this.username,
        password: this.password,
      };

      const isSuccess = await this.postUserLogin(requestData);
      if (isSuccess) {
        this.$router.push({ name: "Home" });
      } else {
        //@TODO:ダイアログ表示
        console.log("ログインに失敗しました");
      }
    },
  },
});
</script>

<style></style>
