/**
  @see https://next.vuex.vuejs.org/
*/
import { createStore } from "vuex";
import word from "@/store/modules/word"
import auth from "@/store/modules/auth"

export default createStore({
  modules: {
    word,
    auth
  },
});
