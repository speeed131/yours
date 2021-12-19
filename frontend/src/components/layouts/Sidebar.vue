<template>
  <div class="w-64 h-screen">
    <nav class="pt-4">
      <template v-for="(item, i) in sideBarMenu" :key="i">
        <a
          class="
            hover:text-gray-800 hover:bg-gray-100
            flex
            items-center
            p-2
            mb-2
            transition-colors
            dark:hover:text-white dark:hover:bg-gray-600
            duration-200
            text-gray-600
            dark:text-gray-400
            rounded-lg
          "
          @click="toMovePage(item.routeName)"
        >
          <i class="text-blueGray-400 mr-2 text-sm" :class="item.class"></i>
          <span class="mx-4 text-md font-normal">
            {{ item.title }}
          </span>
          <span class="flex-grow text-right"> </span>
        </a>
      </template>
    </nav>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      collapseShow: "hidden",
      //@TODO: SideBarNavMenuのコンポーネント分割、以下のオブジェクト使用
      sideBarMenu: [
        {
          title: "ホーム",
          routeName: "Home",
          class: "fas fa-tv",
        },
        {
          title: "未習得の単語一覧",
          routeName: "Words",
          class: "fas fa-th-list",
        },
        {
          title: "習得済みの単語一覧",
          routeName: "WordsRemembered",
          class: "fas fa-check-circle",
        },
        // {
        //   title: "作成した日記一覧",
        //   routeName: "Dailies",
        //   class: "fas fa-fingerprint",
        // },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    toMovePage(routeName) {
      this.$router.push({ name: routeName });
    },
  },
});
</script>
