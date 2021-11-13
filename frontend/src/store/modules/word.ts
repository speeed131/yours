import { api } from "@/api/index"
import { ActionContext } from "vuex";
import { IWord } from "@/interfaces/api"
import { WordState} from "@/interfaces/state"

// initial state
const state = (): WordState => ({
  words: []
})

// getters
const getters = {
  words: (state: WordState): IWord[] => state.words,
}

// actions
const actions = {
  async getWords ({ commit }: ActionContext<WordState, any>): Promise<void> {
    try {
      const response = await api.word.getWords();
      commit('setWords', response)
      // commit('setCheckoutStatus', 'successful')
    } catch (e) {
      console.error(e)
      //@TODO: APIエラーダイアログ表示
      // commit('setCheckoutStatus', 'failed')
      // rollback to the cart saved before sending the request
      // commit('setCartItems', { items: savedCartItems })
    }
  },
}

// mutations
const mutations = {
  setWords (state: WordState, words: IWord[]): void {
    state.words = words
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}