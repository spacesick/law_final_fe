const tokenKey = 'lawToken'
const usernameKey = 'usernameToken'

export const state = () => ({
  token: localStorage.getItem(tokenKey) || null,
  username: localStorage.getItem(usernameKey) || null,
})

export const getters = {
  GET_TOKEN(state) {
    return state.token
  },
  GET_USERNAME(state) {
    return state.username
  }
}

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USERNAME(state, payload) {
    state.username = payload
  },
}

export const actions = {
  fetchToken() {
    return 'token-test'
  },
  setToken({ commit }, payload) {
    localStorage.setItem(tokenKey, payload)
    commit('SET_TOKEN', payload)
  },
  removeToken({ commit }) {
    localStorage.removeItem(tokenKey)
    commit('SET_TOKEN', null)
  },
  setUsername({ commit }, payload) {
    localStorage.setItem(usernameKey, payload)
    commit('SET_USERNAME', payload)
  },
  removeUsername({ commit }) {
    localStorage.removeItem(usernameKey)
    commit('SET_USERNAME', null)
  },
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}