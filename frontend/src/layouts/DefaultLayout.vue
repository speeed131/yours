<template>
  <Header></Header>
  <div class="relative">
    <div class="flex justify-between">
      <div v-if="loginUser" class="">
        <Sidebar />
      </div>
      <div class="flex-grow bg-gray-100">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "About",
  components: { Sidebar, Header },
  setup() {
    const store = useStore();
    const state = reactive({
      msg: "Hello TypeScript",
    });
    return {
      ...toRefs(state),
      loginUser: computed(() => store.getters["auth/loginUser"]),
    };
  },
});
</script>

<style lang="sass" scoped></style>
