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
    }catch{
        throw "Não foi possível criar a Lista"
    }
    return list
}

export const createTask = (title:string, listTitle:string) => {
    let task:Task = {
        title,
        done:false
    } 
    console.log(task)
    const index = todoListsMock.findIndex((item)=>item.listTitle == listTitle)
    try{
        console.log(index)
        todoListsMock[index].tasks.push(task)
    }catch{
        throw "Não foi possível criar a tarefa"
    }
    return todoListsMock[index]
}