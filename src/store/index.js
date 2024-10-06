import SecureLS from "secure-ls";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
var ls = new SecureLS({ isCompression: false });

export const store = createStore({
    state : {
        businessUser : null,
        token : null,
        language : null,
        loginUser : null, 
        resetPasswordEmail : null, 
    },
    mutations : {
        setBusinessUser(state, businessUser)
        {
            state.businessUser = businessUser;
        },
        setToken(state, token)
        {
            state.token = token;
        },
        logoutBusinessUser(state)
        {
            state.token = null;
            state.businessUser = null;
        },
        setLanguage(state, language)
        {
            state.language = language;
        },
        setLoginUser(state, loginUser)
        {
            state.loginUser = loginUser;
        },
        setResetPasswordEmail(state, resetPasswordEmail)
        {
            state.resetPasswordEmail = resetPasswordEmail;
        },
    },
    getters : {
        _isAuthenticated: state => state.businessUser !== null,
        _currentBusiness: state => state.businessUser?.business,
        _currentUser: state => state.businessUser,
        _isBusinessRegistered: state => state.businessUser !== null && state.businessUser.business !== null,
        _token: state => state.token,
        _language: state => state.language,
        _loginUser: state => state.loginUser,
        _resetPasswordEmail: state => state.resetPasswordEmail
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
