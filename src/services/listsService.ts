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

export const getList = (collectionName:string) => {
    return todoListsMock.find((item)=>item.listTitle == collectionName)
}

export const createList = (listTitle:string)=> {
    listTitle = add_(listTitle)
    let list:List = {
        listTitle,
        created: Date.now(),
        tasks: []
    }
    try{
        todoListsMock.push(list)
    }catch(e){
        throw "Não foi possível criar a Lista: " + e
    }
    return list
}

export const createTask = (title:string, listTitle:string) => {
    let task:Task = {
        title,
        done:false
    } 
    const index = todoListsMock.findIndex((item)=>item.listTitle == listTitle)
    try{
        todoListsMock[index].tasks.push(task)
    }catch(e){
        throw "Não foi possível criar a tarefa: " + e
    }
    return todoListsMock[index]
}

export const changeTask = (collectionName:string,taskName:string,props:keyof Task,value:any) => {
    console.log(collectionName)
    const index = todoListsMock.findIndex((item)=>item.listTitle == collectionName)
    const tasks =todoListsMock[index].tasks
    const indexTask = tasks.findIndex((item)=>item.title == taskName)
    try{
        tasks[indexTask][props] = value
    }catch(e){
        throw "Não foi possível alterar a tarefa: " + e

    }
    console.log(todoListsMock)
    return todoListsMock[index]
}

export const saveRecentLists = (listName:string)=>{
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