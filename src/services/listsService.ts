import { add_, type List,type Task } from "@/composables/utils";

let todoListsMock = [//collection
    { //document
        created: Date.now(),
        listTitle: "example",
        tasks:[//collection
            {//doc
                title: 'task example 1',
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
        console.log(index)
        todoListsMock[index].tasks.push(task)
    }catch(e){
        throw "Não foi possível criar a tarefa: " + e
    }
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