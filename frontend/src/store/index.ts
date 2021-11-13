/**
  @see https://next.vuex.vuejs.org/
*/
import { createStore } from "vuex";
import word from "@/store/modules/word"

export default createStore({
  modules: {
    word,
  },
});
