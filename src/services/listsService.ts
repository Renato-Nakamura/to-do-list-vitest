import { add_, type List,type Task } from "@/composables/utils";

let todoListsMock = [//collection
    { //document
        created: Date.now(),
        listTitle: "example",
        tasks:[//collection
            {//doc
                title: 'task',
                done: false
            },
            {//doc
                title: 'task example 2',
                done: true
            }
        ]
    }
]

export const getList = async (collectionName:string) => {
    let list
    try{
        const res = await fetch('https://to-do-back.vercel.app/'+collectionName,{
            method:"GET"
        })
        list = await res.json()
    }
    catch(e){
        throw "Não foi possível acessar a Lista: " + e
    }
    // return todoListsMock.find((item)=>item.listTitle == collectionName)
    console.log(list)
    return list[0]
}

export const createList = async (listTitle:string)=> {
    listTitle = add_(listTitle)
    let list:List = {
        listTitle,
        created: Date.now(),
        tasks: []
    }
    try{
        const res = await fetch('https://to-do-back.vercel.app/',{
            headers: { 'Content-type': 'application/json' },
            method:'POST',
            body: JSON.stringify(list)
        })
        list = await res.json()
    }catch(e){
        throw "Não foi possível criar a Lista: " + e
    }
    return list
}

export const createTask = async (title:string, listCollection:List) => {
    let task:Task = {
        title,
        done:false
    } 
    listCollection.tasks.push(task)
    // const index = todoListsMock.findIndex((item)=>item.listTitle == listTitle)
    try{
        const res = await fetch('https://to-do-back.vercel.app/'+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        listCollection = await res.json()
        // todoListsMock[index].tasks.push(task)
    }catch(e){
        throw "Não foi possível criar a tarefa: " + e
    }
    return listCollection
}

export const changeTask = async (listCollection:List,taskName:string,props:keyof Task,value:string | boolean) => {
    console.log(listCollection)
    // const index = todoListsMock.findIndex((item)=>item.listTitle == _id)
    // const tasks =todoListsMock[index].tasks
    // const indexTask = tasks.findIndex((item)=>item.title == taskName)
    const indexTask = listCollection.tasks.findIndex((item)=>item.title == taskName)
    listCollection.tasks[indexTask][props] = value
    try{
        // tasks[indexTask][props] = value
        const res = await fetch('https://to-do-back.vercel.app/'+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        listCollection = await res.json()
    }catch(e){
        throw "Não foi possível alterar a tarefa: " + e

    }
    // console.log(todoListsMock)
    return listCollection
}

export const saveRecentLists = (listName:string)=>{
    if(!listName) return
    let lists:string[] = []
    const saved = localStorage.getItem('lists')
    if(saved){
        lists = JSON.parse(saved)
    }
    if(!lists.find(list => list == listName)) lists.push(listName)
    localStorage.setItem('lists',JSON.stringify(lists))
    console.log(lists)
    return lists
}

export const getRecentLists = ()=> {
    const lists = localStorage.getItem('lists')
    if(!lists) return
    return JSON.parse(lists)
}

export const removeFromRecentLists =  (listTitle:string) => {
    const lists = localStorage.getItem('lists')
    if(!lists) return
    let listsArray:string[] =  JSON.parse(lists)
    const index = listsArray.indexOf(listTitle)
    listsArray.splice(index,1)
    localStorage.setItem('lists',JSON.stringify(listsArray))
}