import noInternetIcon from '../assets/no-internet.svg'
const NoInternet = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[70vh] '>
            <img className='w-40' src={noInternetIcon} alt="NO Internet Icon" />
            <p className='text-xl text-gray-500'>No Internet Connection</p>
        </div>
    )
}

export default NoInternet