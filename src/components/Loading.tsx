import loadingIcon from '../assets/loading-icon.svg'
const Loading = () => {
    return (
        <div className='w-full h-[80vh] flex justify-center items-center'>
            <img src={loadingIcon} alt="loading icon" />
        </div>
    )
}

export default Loading