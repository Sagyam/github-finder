import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'
import { getRepos } from '../../context/github/GithubActions'
import GithubContext from '../../context/github/GithubContext'

function RepoList({ repos, login }) {
  const { dispatch } = useContext(GithubContext)
  const [sort, setSort] = useState('updated')
  const [type, setType] = useState('all')

  const handleSortChange = async (e) => {
    setSort(e.target.value)
    const repos = await getRepos(login, e.target.value, type)
    dispatch({ type: 'SET_REPOS', payload: repos })
  }

  const handleTypeChange = async (e) => {
    setType(e.target.value)
    const repos = await getRepos(login, sort, e.target.value)
    dispatch({ type: 'SET_REPOS', payload: repos })
  }

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='container ml-5'>
        <select
          className='select select-bordered w-full max-w-xs select-lg m-5'
          onChange={handleTypeChange}
        >
          <option disabled>Type</option>
          <option value='all'>All</option>
          <option value='owner'>Owner</option>
          <option value='member'>Member</option>
        </select>

        <select
          className='select select-bordered w-full max-w-xs select-lg m-5'
          onChange={handleSortChange}
        >
          <option disabled>Sort By</option>
          <option value='created'>Created</option>
          <option value='updated'>Updated</option>
          <option value='pushed'>Pushed</option>
          <option value='full_name'>Full Name</option>
        </select>
      </div>

      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>Repositories</h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  login: PropTypes.string.isRequired,
}

export default RepoList
