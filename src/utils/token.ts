import { JWT_TOKEN_KEY } from '~/config'

export function setToken(token: string) {
  localStorage.setItem(JWT_TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(JWT_TOKEN_KEY)
}

export function removeToken() {
  localStorage.removeItem(JWT_TOKEN_KEY)
}
