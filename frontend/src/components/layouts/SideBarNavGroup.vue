<template>
  <ul class="md:flex-col md:min-w-full flex flex-col list-none">
    <!-- そのルートのときは以下を参考にアクティブにし、色を変える -->
    <!-- <li class="items-center">
      <a class="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="#/dashboard"
        ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>ホーム</a
      >
    </li> -->
    <li class="items-center" v-for="(item, i) in sideBarMenu" :key="i">
      <a
        class="
          text-blueGray-700
          hover:text-blueGray-500
          text-xs
          uppercase
          py-3
          font-bold
          block
        "
        @click="toMovePage(item.routeName)"
        ><i class="text-blueGray-400 mr-2 text-sm" :class="item.class"></i>
        {{ item.title }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "About",
  components: {},
  props: {
    sideBarMenu: {
      //@TODO: 適切なインターフェースにする
      type: Object,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      msg: "Hello TypeScript",
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    toMovePage(routeName: string): void {
      this.$router.push({ name: routeName });
    },
  },
});
</script>
