import { BiSolidPencil, BiMessage, BiLogoStackOverflow } from 'react-icons/bi';

const RightBar = () => {
    return (
        <aside className='hidden md3:block min-w-[268px] max-w-[268px] pl-3 '>
            <div className='bg-[#FDF7E2]  rounded-md border-[2px] border-[#fff2c0] '>
                <div className='space-y-2 px-2'>
                    <h2 className='font-semibold bg-[#fbf3d6] border-b-[2px] border-b-[#fff2c0] p-2 text-center '  >The Overflow Blog</h2>
                    <p className='flex items-center gap-2 text-xs'><BiSolidPencil className="text-xl" />Want better answers from your data? Ask better questions</p>
                    <p className='flex items-center gap-2 text-xs'><BiSolidPencil className="text-xl" />Making event-driven development predictable with Discover</p>
                </div>
                <div className='space-y-2 px-2 pb-3'>
                    <h2 className='font-semibold bg-[#fbf3d6] border-b-[2px] border-b-[#fff2c0] p-2 text-center '   >Featured on Meta</h2>
                    <p className='flex items-center gap-2 text-xs'><BiMessage className="text-xl text-blue-500" />Moderation strike: Results of negotiations</p>
                    <p className='flex items-center gap-2 text-xs'><BiMessage className="text-xl text-blue-500" />Our Design Vision for Stack Overflow and the Stack Exchange network</p>
                    <p className='flex items-center gap-2 text-xs'><BiLogoStackOverflow className="text-xl" />Temporary policy: Generative AI (e.g., ChatGPT) is banned</p>
                    <p className='flex items-center gap-2 text-xs'><BiLogoStackOverflow className="text-xl" />Collections: A New Feature for Collectives on Stack Overflow</p>
                    <p className='flex items-center gap-2 text-xs'><BiLogoStackOverflow className="text-xl" />Preview of Search and Question-Asking Powered by GenAI</p>
                    <p className='flex items-center gap-2 text-xs'><BiLogoStackOverflow className="text-xl" />Call for volunteer reviewers for an updated search experience: OverflowAI Search</p>
                </div>
            </div>
        </aside>
    )
}

export default RightBar