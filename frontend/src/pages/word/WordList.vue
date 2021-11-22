<template>
  <div class="WordList">
    {{ words }}
  </div>
</template>

<script lang="ts">
import { IWord } from "@/interfaces/api";
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "WordList",
  components: {},
  async setup() {
    const store = useStore();
    await store.dispatch("word/getWords");

    return {
      words: computed(() => store.getters("words")),
    };
  },
  // computed: {

  // }
});
</script>
