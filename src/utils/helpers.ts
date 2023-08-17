import { IQuestion, ITags, IUser } from "../Types";

export const usersList:IUser[]=[{ id: '1', displayName: 'saifi33', location: 'delhi', reputation: 234, tags: 'javascript,react,html', imageUrl: 'https://placehold.jp/60x60.png' },
{ id: '2', displayName: 'viscarte', location: '127.0.0.1', reputation: 596, tags: 'c++,php,go', imageUrl: 'https://placehold.jp/60x60.png' },
{ id: '3', displayName: 'iron man', location: 'usa', reputation: 596, tags: 'iron,al,go', imageUrl: 'https://placehold.jp/60x60.png' },
{ id: '4', displayName: 'alien', location: 'mars', reputation: 596, tags: 'alien++,dhoop,moonlight', imageUrl: 'https://placehold.jp/60x60.png' }]

export const tags:ITags[]=[
    {id:'1',name:'javascript',description:'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant to your question: e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc. ',questionAsked:0},
    {id:'2',name:'python',description:'Python is a dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, NumPy), please include it in the tags.',questionAsked:0},
    {id:'3',name:'java',description:`Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.`,questionAsked:0},
    {id:'4',name:'C#',description:`C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include .NET, .NET Framework, .NET MAUI, and Xamarin among others. Use this tag for questions about code written in C# or about C#'s formal specification.`,questionAsked:0}
]

export const questions:IQuestion[]=[
    {
        id:'0',
        title:'How to create a function in javascript',
        description:"I'm trying to create a function in javascript please help me",
        tags:'javascript,es2015',
        answers:0,
        askedAt:'Aug 9 at 9:50',
        votes:0,
        askedBy:{
            ...usersList[0]
        }
    },
    {
        id:'1',
        title:'How to create a function in javascript',
        description:"I'm trying to create a function in javascript please help me",
        tags:'javascript,es2015',
        answers:0,
        askedAt:'Aug 10 at 9:50',
        votes:0,
        askedBy:{
            ...usersList[1]
        }
    }
]