<template>
  <div class="WordsListRemembered">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "WordsListRemembered",
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
