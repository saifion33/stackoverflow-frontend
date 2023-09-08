
const ReputationAndBadge = () => {
  return (
    <div>
      <header>
        <h1 className="text-xl font-medium  pt-4">Reputation And Badges</h1>
        <p className="text-gray-600">How you can earn reputation and badges</p>
      </header>
      <div className="my-4">
        <h1 className="text-xl">Reputation Rules</h1>
        <p className="text-gray-700 pt-2 font-medium">Reputation Increase</p>
        <ul className="list-disc pl-4 text-gray-600">
          <li>When your answer mark as accepted +10</li>
          <li>When you accept an answer +4</li>
          <li>When your question upvoted +6 </li>
          <li>When you upvote question  +2 </li>
          <li>When your answer upvoted +6 </li>
          <li>When you upvote answer +2 </li>
          <li>Ask first question +5 </li>
          <li>On Every Answer +5 </li>

        </ul>
        <p className="text-gray-700 pt-2 font-medium">Reputation Decrease</p>
        <ul className="list-disc pl-4 text-gray-600">
          <li>When your question downvoted -2</li>
          <li>When your answer downvoted -2 </li>
          <li>When you delete an answer downvoted -5 </li>
          <li>when you downvote question or answer -1 reputation</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Badges Rules</h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-2 justify-center lg:justify-evenly">
          <div className="border-2 rounded-md overflow-hidden md:w-[260px] lg:w-[320px]">
            <h1 className="font-medium border-b-2 p-1 bg-[#e2bc9b]">1. Bronze</h1>
            <div className="divide-y-2">
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#e2bc9b] `}></span> <p>Nice Question</p></div>
                <p className="text-gray-600 text-sm">when your any question get 4 upvotes for first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#e2bc9b] `}></span> <p>Nice Answer</p></div>
                <p className="text-gray-600 text-sm">When your any answer get 4 upvotes for first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#e2bc9b] `}></span> <p>Scholar</p></div>
                <p className="text-gray-600 text-sm">When you accept an answer first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#e2bc9b] `}></span> <p>Teacher</p></div>
                <p className="text-gray-600 text-sm">When your any answer get 2 upvotes first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#e2bc9b] `}></span> <p>Student</p></div>
                <p className="text-gray-600 text-sm">Ask 2 questions </p>
              </div>

            </div>
          </div>
          <div className="border-2 rounded-md overflow-hidden md:w-[300px] lg:w-[320px]">
            <h1 className="font-medium border-b-2 p-1 bg-[#B3B8BC]">2. Silver</h1>
            <div className="divide-y-2">
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#B3B8BC] `}></span> <p>Good Question</p></div>
                <p className="text-gray-600 text-sm">when your any question get 8 upvotes first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#B3B8BC] `}></span> <p>Good Answer</p></div>
                <p className="text-gray-600 text-sm">When your any answer get 8 upvotes first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#B3B8BC] `}></span> <p>Voter</p></div>
                <p className="text-gray-600 text-sm">when you vote 15 question.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#B3B8BC] `}></span> <p>Knowledge Seeker</p></div>
                <p className="text-gray-600 text-sm">Ask 20 questions.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#B3B8BC] `}></span> <p>Master</p></div>
                <p className="text-gray-600 text-sm">When you hit 200 reputation</p>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-md overflow-hidden md:w-[300px] lg:w-[320px]">
            <h1 className="font-medium border-b-2 p-1 bg-[#FFCC00]">3. Gold</h1>
            <div className="divide-y-2">
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#FFCC00] `}></span> <p>Great Question</p></div>
                <p className="text-gray-600 text-sm">When your any question get 15 upvotes first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#FFCC00] `}></span> <p>Great Answer</p></div>
                <p className="text-gray-600 text-sm">When your any answer get 15 upvotes first time.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#FFCC00] `}></span> <p>Accepter</p></div>
                <p className="text-gray-600 text-sm">When your 10 answer Accepted.</p>
              </div>
              <div className="p-2">
                <div className="py-1 px-2 w-fit rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[#FFCC00] `}></span> <p>Professor</p></div>
                <p className="text-gray-600 text-sm">When you hit 400 reputation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReputationAndBadge