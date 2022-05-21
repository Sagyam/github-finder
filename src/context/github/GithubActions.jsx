import axios from 'axios'

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN

const githubAxios = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_API_TOKEN}`,
  },
})

export const searchUsers = async (text, sort) => {
  const params = new URLSearchParams({
    q: text,
    sort: sort || 'followers',
    per_page: 25,
  })

  const response = await githubAxios.get(`/search/users?${params}`)
  return response.data.items
}

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    githubAxios.get(`/users/${login}`),
    githubAxios.get(`/users/${login}/repos`),
  ])

  return {
    user: user.data,
    repos: repos.data,
  }
}
