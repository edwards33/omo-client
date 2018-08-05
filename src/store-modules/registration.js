import * as types from './mutation-types';
import * as urls from './url-constants';
import axios from 'axios';

const WHITE_COLOR = {color: '#fff'}
const RED_COLOR = {color: '#f00'}

const state = {
    loading: false,
    message: '',
    color: WHITE_COLOR
}

const getters = {

}

const actions = {
    userSignUp({
        commit
    }, postParams) {
        commit(types.CHANGE_LOADING_STATE, true)
        axios
            .post(urls.URL, postParams)
            .then((response) => {

                commit(types.CHANGE_LOADING_STATE, false)

                if(response.data.hasError){
                    commit(types.SET_MESSAGE_COLOR, RED_COLOR)
                }
                else{
                    commit(types.SET_MESSAGE_COLOR, WHITE_COLOR)
                }
                commit(types.SET_RESPONSE_MESSAGE, response.data.message)
            })
            .catch(err => {
                commit(types.SET_MESSAGE_COLOR, RED_COLOR)
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.SET_RESPONSE_MESSAGE, err.message)
            })
    }
}

const mutations = {
    [types.CHANGE_LOADING_STATE](state, loading) {
        state.loading = loading
    },
    [types.SET_MESSAGE_COLOR](state, color) {
        state.color = color
    },
    [types.SET_RESPONSE_MESSAGE](state, message) {
        state.message = message
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}