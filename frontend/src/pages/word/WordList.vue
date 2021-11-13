<template>
  <div class="WordList" @click="dispatchGetWords()">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { IWord } from "@/interfaces/api";
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex"

export default defineComponent({
  name: "WordList",
  components: {},
  setup() {
    const store = useStore()
    const state = reactive({
      msg: "Hello TypeScript",
    });
    return {
      ...toRefs(state),

      //一応呼び出しはできた。 ログインと登録機能先に作る必要ありそう
      dispatchGetWords: () => {
        store.dispatch("word/getWords")
      }

    };
  },
  // computed: {

  // }
});
</script>
