<template>
  <Header></Header>
  <div class="relative bg-white dark:bg-gray-800">
    <div class="flex justify-between">
      <div v-if="false" class="flex-grow">
        <Sidebar />
      </div>
      <div class="flex-grow">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
export default defineComponent({
  name: "About",
  components: { Sidebar, Header },
  setup() {
    const state = reactive({
      msg: "Hello TypeScript",
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="sass" scoped></style>
