import { IAnswer, IQuestion, ITags, IUser } from "../Types";
import AvatarEditor from 'react-avatar-editor'
export const usersList: IUser[] = [
    { _id: '1', displayName: 'saifi33', location: 'delhi', reputation: 234, tags: 'javascript,react,html', imageUrl: 'https://randomuser.me/api/portraits/med/men/73.jpg', joinedOn: '12/5/2023', answerCount: 0, questionCount: 0, about: 'full stack develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '2', displayName: 'viscarte', location: '127.0.0.1', reputation: 596, tags: 'c++,php,go', imageUrl: 'https://randomuser.me/api/portraits/med/men/6.jpg', joinedOn: '12/5/2023', answerCount: 0, questionCount: 0, about: 'MERN develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '3', displayName: 'iron man', location: 'usa', reputation: 596, tags: 'iron,al,go', imageUrl: 'https://randomuser.me/api/portraits/med/men/5.jpg', joinedOn: '12/5/2023', answerCount: 0, questionCount: 0, about: 'python develper', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] },
    { _id: '4', displayName: 'alien', location: 'mars', reputation: 596, tags: 'alien++,dhoop,moonlight', imageUrl: 'https://randomuser.me/api/portraits/med/men/15.jpg', joinedOn: '12/5/2023', answerCount: 0, questionCount: 0, about: 'exploring new planets and stars', badges: [{ name: 'Bronze', count: 1, badgesList: ['student'] }, { name: 'Silver', count: 0, badgesList: [] }, { name: 'Gold', count: 0, badgesList: [] }] }]

export const tags: ITags[] = [
    { id: '1', name: 'javascript', description: 'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant to your question: e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc. ', questionAsked: 0 },
    { id: '2', name: 'python', description: 'Python is a dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, NumPy), please include it in the tags.', questionAsked: 0 },
    { id: '3', name: 'java', description: `Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.`, questionAsked: 0 },
    { id: '4', name: 'C#', description: `C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include .NET, .NET Framework, .NET MAUI, and Xamarin among others. Use this tag for questions about code written in C# or about C#'s formal specification.`, questionAsked: 0 }
]

export const questions: IQuestion[] = [
    {
        id: '0',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 1,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '1',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '2',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '3',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '4',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '5',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 9 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[0]
        }
    },
    {
        id: '6',
        title: 'How to create a function in javascript',
        description: "I'm trying to create a function in javascript please help me",
        tags: 'javascript,es2015',
        answers: 0,
        askedAt: 'Aug 10 at 9:50',
        votes: 0,
        askedBy: {
            ...usersList[1]
        }
    }
]

export const answer: IAnswer = { answer: 'HI, define function in javascript like this function functionName(){//some code here}', answerAt: 'Aug 10 at 9:50', answerBy: usersList[1], answerOf: '0', votes: 0 }

export const firstBadgeCriteria: { [key: string]: string } = {
    Bronze: 'Ask a question that scrore 2 or more to earn your first Bronze badge',
    Silver: 'Ask a question that score 10 or more to earned your first Silver badge',
    Gold: 'Ask a question that score 20 or more to earned your first Gold badge'
}

export const getImageBlob = async (editorRef: React.RefObject<AvatarEditor>) => {
    return new Promise((resolve, reject) => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas()
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(blob)
                }
                else {
                    reject(new Error('cant process file'));
                }
            })
        }
    })
}