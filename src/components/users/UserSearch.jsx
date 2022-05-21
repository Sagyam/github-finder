import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

function UserSearch() {
  const [text, setText] = useState('')
  const [sort, setSort] = useState('followers')

  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })

      const users = await searchUsers(text, sort)
      dispatch({ type: 'SET_USERS', payload: users })
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2'>
      <div>
        <form action='submit' onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                type='submit'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className='btn btn-ghost btn-lg'
            type='button'
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
          >
            Clear
          </button>
        </div>
      )}

      {users.length > 0 && (
        <select
          className='select select-bordered w-full max-w-xs select-lg m-5'
          onChange={handleSortChange}
        >
          <option disabled>Sort By</option>
          <option value='followers'>Followers</option>
          <option value='repositories'>Repositories</option>
          <option value='joined'>Joined</option>
        </select>
      )}
    </div>
  )
}

export default UserSearch
