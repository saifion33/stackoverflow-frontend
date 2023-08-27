interface IProps {
    userName: string
}
const Avatar = ({ userName }: IProps) => {
    return (
        <div className="text-2xl w-9 h-9 py-1 flex justify-center items-center px-3 rounded-full bg-blue-600 text-stone-50">
            <p>{
                userName.slice(0, 1).toUpperCase()
            }</p>
        </div>
    )
}

export default Avatar