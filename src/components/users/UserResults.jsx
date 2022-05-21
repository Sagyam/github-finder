import React, { useEffect, useState } from 'react'

import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

function UserResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_GITHUH_API_URL}/users`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                },
            }
        )
        const data = await res.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    )
}

export default UserResults
