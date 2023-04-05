import {
  AUTH_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
  AUTH_LOGIN_ACTION
} from './storeconstants'
import SingupValidations from '@/services/SignupValidations'
import Axios from 'axios'

export default {
  async [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      email: null,
      token: null,
      expiresIn: null,
      refresToken: null,
      userId: null
    })
    localStorage.removeItem('userData')
  },

  async [LOGIN_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
        AIzaSyBxGt8MN7aI3Ouv3_WT3aMPcmmPe-Goscs`
    })
  },

  async [SIGNUP_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
        AIzaSyBxGt8MN7aI3Ouv3_WT3aMPcmmPe-Goscs`
    })
  },

  async [AUTH_LOGIN_ACTION](context) {
    let userData = localStorage.getItem('userData')

    if (userData) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, JSON.stringify(userData))
    }
  },

  async [AUTH_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    }
    let response = ''

    try {
      response = await Axios.post(payload.url, postData)
    } catch (err) {
      let errorMessage = SingupValidations.getErrorMessageFromCode(
        err.response.data.error.errors[0].message
      )
      throw errorMessage
    }

    if (response.status === 200) {
      let tokenData = {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: response.data.expiresIn,
        refresToken: response.data.refreshToken,
        userId: response.data.localId
      }
      localStorage.setItem('userData', JSON.stringify(tokenData))
      context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
    }
  }
}
