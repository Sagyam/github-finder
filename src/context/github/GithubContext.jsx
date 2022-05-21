import React, { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  const searchUsers = async (text) => {
    setLoading()
    const params = new URLSearchParams({
      q: text,
    })

    const res = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    })
    const { items } = await res.json()
    dispatch({ type: 'GET_USERS', payload: items })
  }

  const getUser = async (login) => {
    setLoading()

    const res = await fetch(`${GITHUB_API_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    })
    if (res.status === 404) {
      window.location.href = '/notfound'
    } else {
      const user = await res.json()
      dispatch({ type: 'GET_USER', payload: user })
    }
  }

  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
