<template>
  <div class="WordList">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "WordList",
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
