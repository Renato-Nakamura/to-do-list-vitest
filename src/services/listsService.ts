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
interface Task {
    title: string,
    done: boolean
}

interface List{
    created: number,
    listTitle: string,
    tasks:Task[]
}

export const getList = (collectionName:string) => {
    return todoListsMock.find((item)=>item.listTitle == collectionName)
}

export const createList = (listTitle:string)=> {
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