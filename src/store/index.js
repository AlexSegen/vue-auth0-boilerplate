import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router'

import { login, handleAuth, logout, isLoggedIn  } from '@/utils/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLoggedIn: false,
    access_token: null,
    id_token: null,
    expires_at: null,
    profile: {},
    hasError: false
  },
  getters: {
    LOADING: state => {
      return state.isLoading;
    },
    IS_LOGGED_IN: state => {
      return state.isLoggedIn;
    },
    ACCESS_TOKEN: state => {
      return state.access_token;
    },
    ID_TOKEN: state => {
      return state.id_token;
    },
    EXPIRES_AT: state => {
      return state.expires_at;
    },
    PROFILE: state => {
      return state.profile;
    }
  },
  mutations: {
    makeRequest(state) {
      state.hasError = false;
      state.isLoading = true;
    },
    reqSuccess(state) {
      state.hasError = false;
      state.isLoading = false;
    },
    reqError(state, error) {
      state.hasError = error.message;
      state.isLoading = false;
    },
    handleAuth(state, payload) {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    checkIfsLoggedIn(context) {
      try {
        context.commit('handleAuth', isLoggedIn());
      } catch (error) {
        console.log('Store: Error in [ACTION] => isLoggedIn', error.message);
      }
    },
    logout(context) {
      try {
        logout()
        context.commit('handleAuth', isLoggedIn());
        router.push("/");
      } catch (error) {
        console.log('Store: Error in [ACTION] => logout', error.message);
      }
    }
  },
  modules: {
  }
})
