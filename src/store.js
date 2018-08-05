import Vue from 'vue'
import Vuex from 'vuex'
import RegistrationModule from './store-modules/registration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    RegistrationModule
  }
})
