import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface Iprops {
    votes: number,
    onUpvote(): void;
    onDownvote(): void;
}

const Votes = ({ votes,onUpvote,onDownvote }: Iprops) => {
    return (
        <div className="flex flex-col gap-1 items-center md:text-xl md:gap-2">
            <div onClick={onUpvote} role="button" className=" p-2  rounded-full border-[1px]">
                <BiSolidUpArrow />
            </div>
            <p> {votes}</p>
            <div onClick={onDownvote} role="button" className=" p-2  rounded-full border-[1px]">
                <BiSolidDownArrow />
            </div>
        </div>
    )
}

export default Votes