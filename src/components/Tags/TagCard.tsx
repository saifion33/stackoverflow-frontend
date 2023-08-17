import { ITags } from "../../Types"

interface Iprops {
  tag: ITags
}

const TagCard = ({ tag }: Iprops) => {
  const { name, description, questionAsked } = tag
  return (
    <div className="border-[1px] rounded-md p-2 space-y-3 sm:w-[48%] sm:max-w-[380px] md3:w-[32%] md3:max-w-[314px] xl:w-[24%]" >
      <h2 className="text-blue-500 bg-blue-100 w-fit py-1 px-2 rounded-md ">{name}</h2>
      <p className="text-gray-600 text-sm">{description.split(' ').slice(0, 25).join(' ')}...</p>
      <div className="text-gray-600">
        <p>{questionAsked} questions</p>
      </div>
    </div>
  )
}

export default TagCard