const tokenKey = 'lawToken'

export const state = () => ({
  token: localStorage.getItem(tokenKey) || null,
})

export const getters = {
  GET_TOKEN(state) {
    return state.token
  },
}

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
}

export const actions = {
  fetchToken() {
    return 'token-test'
  },
  setToken({ commit }) {
    localStorage.setItem(tokenKey, 'filled')
    commit('SET_TOKEN', 'filled')
  },
  removeToken({ commit }) {
    localStorage.removeItem(tokenKey)
    commit('SET_TOKEN', null)
  },
}
