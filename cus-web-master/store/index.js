import Cookies from 'js-cookie'

export const state = () => ({
  sidebar: false,
  drawer: true,
  saveId: Cookies.get('saveId'),
  userId: Cookies.get('userId'),
  userNm: Cookies.get('userNm'),
  authCd: Cookies.get('authCd'),
  tokenVal: Cookies.get('tokenVal'),
  tabs: Cookies.get('tabs'),
  searchForms: Cookies.get('searchForms'),
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  },
  SET_SAVE_ID(state, data) {
    state.saveId = data
    Cookies.set('saveId', data)
  },
  SET_USER_ID(state, data) {
    state.userId = data
    Cookies.set('userId', data)
  },
  SET_USER_NM(state, data) {
    state.userNm = data
    Cookies.set('userNm', data)
  },
  SET_AUTH_CD(state, data) {
    state.authCd = data
    Cookies.set('authCd', data)
  },
  SET_TOKEN_VAL(state, data) {
    state.tokenVal = data
    Cookies.set('tokenVal', data)
  },
  SET_TABS(state, data) {
    data = JSON.stringify(data)
    state.tabs = data
    Cookies.set('tabs', data)
  },
  SET_SEARCH_FORMS(state, data) {
    let datas = data
    if (data) {
      datas = []
      let isExist = false
      if (state.searchForms) {
        let searchForms = JSON.parse(state.searchForms)
        for (let row of searchForms) {
          if (row.path === data.path) {
            row = Object.assign(row, data)
            isExist = true
          }
          datas.push(row)
        }
      }
      if (!isExist) {
        datas.push(data)
      }
      datas = JSON.stringify(datas)
    }
    state.searchForms = datas
    Cookies.set('searchForms', datas)
  },
}

export const actions = {
  LOGIN({commit}, parameter) {

    if (parameter.isSaveId) {
      commit('SET_SAVE_ID', parameter.userId)
    }
    return new Promise((resolve, reject) => {  
      this.$auth.loginWith('local', {
        data: {
          userId: parameter.userId,
          userPw: parameter.userPw
        }
      }).then(response => {
        const {data} = response
        console.log(response)

        commit('SET_USER_ID', data.userId)
        commit('SET_USER_NM', data.userNm)
        commit('SET_AUTH_CD', data.authCd)
        commit('SET_TOKEN_VAL', data.tokenVal)

        $nuxt.$axios.setToken(data.tokenVal)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  LOGOUT({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_ID', '')
      commit('SET_USER_NM', '')
      commit('SET_AUTH_CD', '')
      commit('SET_TOKEN_VAL', '')
      commit('SET_TABS', '')
      commit('SET_SEARCH_FORMS', '')

      resolve()
    })
  },
  INIT({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_ID', '')
      commit('SET_USER_NM', '')
      commit('SET_AUTH_CD', '')
      commit('SET_TOKEN_VAL', '')
      commit('SET_TABS', '')
      commit('SET_SEARCH_FORMS', '')

      resolve()
    })
  },
  TABS({commit}, parameter) {
    commit('SET_TABS', parameter)
  },
  SEARCHFORMS({commit}, parameter) {
    commit('SET_SEARCH_FORMS', parameter)
  },
}
