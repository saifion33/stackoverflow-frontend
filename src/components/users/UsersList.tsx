import {  useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import UserProfileCard from './UserProfileCard'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { getUsers } from '../../redux/actions/users'
import loadingIcon from '../../assets/loading-icon.svg'
const UsersList = () => {
    
    const {users,loading} =useAppSelector(state=>state.users)
    const dispatch=useAppDispatch()
    const getUserList = () => {
       dispatch(getUsers())
    }
    useEffect(() => {
        getUserList()
        // eslint-disable-next-line
    }, [])
    return (
        <section >
            <header className='py-3  '>
                <h1 className='text-2xl'>Users</h1>
                <div className='flex mt-3 w-64 gap-3 border-[1px] group focus-within:border-blue-600 focus-within:outline-4 focus-within:outline outline-blue-100 border-gray-400 rounded bg-white items-center p-1' >
                    <AiOutlineSearch className="text-xl text-gray-500" />
                    <input className='w-full outline-none group-focus:outline-2' placeholder='Search...' type="text" />
                </div>
            </header>
            <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 '>
                {
                    (!loading && users) &&
                    users.map(user => <UserProfileCard key={user._id} user={user} />)
                }
            </div>
            {
                loading && <div className='w-full h-[80vh] flex justify-center items-center'>
                    <img src={loadingIcon} alt="loading icon" />
                </div>
            }
        </section>
    )
}

export default UsersList