/**
  @see https://next.vuex.vuejs.org/
*/
import { createStore } from "vuex";
import word from "@/store/modules/word"
import auth from "@/store/modules/auth"
import daily from "@/store/modules/daily"

export default createStore({
  modules: {
    auth,
    word,
    daily
  },
});
