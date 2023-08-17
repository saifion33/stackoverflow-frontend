import { AiOutlineSearch } from "react-icons/ai"
import TagCard from "../components/Tags/TagCard"
import { tags } from "../utils/helpers"

const Tags = () => {

  return (
    <div className=' w-full space-y-7 sm:px-6 '>
      <div className="">
        <h1 className="text-2xl">Tags</h1>
        <p className="py-2 text-sm xl:text-base max-w-2xl">A tag is keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
      </div>
      <div>
        <div className='flex  max-w-[200px] gap-3 border-[1px] group focus-within:border-blue-600 focus-within:outline-4 focus-within:outline outline-blue-100 border-gray-400 rounded bg-white items-center p-1' >
          <AiOutlineSearch className="text-xl text-gray-500" />
          <input className='w-full outline-none group-focus:outline-2' placeholder='Filter by tag name...' type="text" />
        </div>
      </div>
      <div className="py-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {
          tags.map(tag => <TagCard tag={tag} key={tag.id} />)
        }
      </div>
    </div>
  )
}

export default Tags