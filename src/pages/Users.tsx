import { useState, useEffect } from 'react'
import { IUser } from '../Types'

import { AiOutlineSearch } from 'react-icons/ai'
import UserProfileCard from '../components/users/UserProfileCard'
import { usersList } from '../utils/helpers'
const Users = () => {
    const [users, setUsers] = useState<null | IUser[]>(null)
    const [isLoading, setIsLoading] = useState(false)
    const getUsers = () => {
        setIsLoading(true)
        setTimeout(() => {
            setUsers(usersList)
            setIsLoading(false);
        }, 1000);
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className=' w-full space-y-7 sm:px-6 '>
            <header className='py-3  '>
                <h1 className='text-2xl'>Users</h1>
                <div className='flex mt-3 w-64 gap-3 border-[1px] group focus-within:border-blue-600 focus-within:outline-4 focus-within:outline outline-blue-100 border-gray-400 rounded bg-white items-center p-1' >
                    <AiOutlineSearch className="text-xl text-gray-500" />
                    <input className='w-full outline-none group-focus:outline-2' placeholder='Search...' type="text" />
                </div>
            </header>
            <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 '>
                {
                    (!isLoading && users) &&
                    users.map(user => <UserProfileCard key={user.id} user={user} />)
                }
            </div>
            {
                isLoading && <div>Loading...</div>
            }
        </div>
    )
}

export default Users