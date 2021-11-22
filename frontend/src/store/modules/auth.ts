import { api } from "@/api/index";
import { ActionContext } from "vuex";
import { IUser, IRegisterRequest, ILoginRequest } from "@/interfaces/api";
import { UserState } from "@/interfaces/state";

// initial state
const state = (): UserState => ({
  users: [],
  loginUser: {
    id: 0,
    username: "",
    email: "",
    hashed_password: "",
    created_at: "",
    updated_at: "",
  },
});

// getters
const getters = {
  users: (state: UserState): IUser[] => state.users,
  loginUser: (state: UserState): IUser => state.loginUser,
};

// actions
const actions = {
  //@TODO:RootStateをAnyにしているため、適切な方に変更する
  async getUserMe({ commit }: ActionContext<UserState, any>): Promise<boolean> {
    try {
      const response = await api.auth.getUserMe();
      commit("setLoginUser", response);
      return response ? true : false;
    } catch (e) {
      console.error(e);
      //@TODO: APIエラーダイアログ表示
      // commit('setCheckoutStatus', 'failed')
      return false;
    }
  },

  async postUserRegister(
    { commit }: ActionContext<UserState, any>,
    register_data: IRegisterRequest
  ): Promise<boolean> {
    try {
      const response = await api.auth.postUserRegister(register_data);
      commit("setLoginUser", response);
      return response ? true : false;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async postUserLogin(
    { commit }: ActionContext<UserState, any>,
    data: ILoginRequest
  ): Promise<boolean> {
    try {
      const response = await api.auth.postUserLogin(data);
      commit("setLoginUser", response);
      return response ? true : false;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

// mutations
const mutations = {
  setLoginUser(state: UserState, loginUser: IUser): void {
    state.loginUser = loginUser;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
