<template>
  <div class="DailyList">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "DailyList",
  components: {},
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
