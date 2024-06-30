import SecureLS from "secure-ls";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
var ls = new SecureLS({ isCompression: false });

export const store = createStore({
    state : {
        business : null,
        token : null,
        language : null
    },
    mutations : {
        setBusiness(state, business)
        {
            state.business = business;
        },
        setToken(state, token)
        {
            state.token = token;
        },
        logoutBusiness(state)
        {
            state.token = null;
            state.business = null;
        },
        setLanguage(state, language)
        {
            state.language = language;
        },
    },
    getters : {
        _isAuthenticated: state => state.business !== null,
        _currentBusiness: state => state.business,
        _token: state => state.token,
        _language: state => state.language,
    },
    plugins: [createPersistedState({
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
      })]
})

export default store;
