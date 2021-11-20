import { api } from "@/api/index";
import { ActionContext } from "vuex";
import { IDaily } from "@/interfaces/api";
import { DailyState } from "@/interfaces/state";

// initial state
const state = (): DailyState => ({
  dailies: [],
});

// getters
const getters = {
  dailies: (state: DailyState): IDaily[] => state.dailies,
};

// actions
const actions = {
  //@TODO:RootStateをAnyにしているため、適切な方に変更する

  async getDailies({ commit }: ActionContext<DailyState, any>): Promise<void> {
    try {
      const response = await api.daily.getDailies();
      commit("setDailies", response);
    } catch (e) {
      console.error(e);
      //@TODO: APIエラーダイアログ表示
      // commit('setCheckoutStatus', 'failed')
    }
  },
};

// mutations
const mutations = {
  setDailies(state: DailyState, dailies: IDaily[]): void {
    state.dailies = dailies;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
