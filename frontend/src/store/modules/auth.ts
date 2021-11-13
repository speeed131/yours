import { api } from "@/api/index"
import { ActionContext } from "vuex";
import { IUser } from "@/interfaces/api"
import { State, UserState } from "@/interfaces/state"


// initial state
const state = (): UserState => ({
  users: [],
  loginUser: {
    id: 0,
    username: "",
    email:  "",
    hashed_password:  "",
    created_at:  "",
    updated_at:  "",
  }
})

// getters
const getters = {
  users: (state: UserState): IUser[] => state.users,
  loginUser: (state: UserState): IUser => state.loginUser
}

// actions
const actions = {
  async getUserMe ({ commit }: ActionContext<UserState, State>): Promise<void> {
    try {
      const response = await api.auth.getUserMe()
      commit('setLoginUser', response)
    } catch (e) {
      console.error(e)
      //@TODO: APIエラーダイアログ表示
      // commit('setCheckoutStatus', 'failed')
    }
  },
}

// mutations
const mutations = {
  setLoginUser (state: UserState, loginUser: IUser): void {
    state.loginUser = loginUser
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}