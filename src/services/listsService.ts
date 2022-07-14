import { add_, type List,type Task } from "@/composables/utils";

export const getList = async (collectionName:string) => {
    let list
    try{
        const res = await fetch('https://to-do-back.vercel.app/'+collectionName,{
            method:"GET"
        })
        list = await res.json()
    }
    catch(e){
        console.error("Não foi possível acessar a Lista: " + e)
        return undefined
    }
    return list[0]
}

export const createList = async (listTitle:string)=> {
    listTitle = add_(listTitle)
    let list:List = {
        listTitle,
        created: Date.now(),
        tasks: [],
    }
    try{
        const res = await fetch('https://to-do-back.vercel.app/',{
            headers: { 'Content-type': 'application/json' },
            method:'POST',
            body: JSON.stringify(list)
        })
        list = await res.json()
    }catch(e){
        console.error("Não foi possível criar a Lista: " + e)
        return undefined
    }
    return list
}

export const createTask = async (title:string, listCollection: List | undefined | null) => {
    if(!listCollection) return undefined
    let task:Task = {
        title,
        done:false
    } 
    listCollection.tasks.push(task)
    try{
        const res = await fetch('https://to-do-back.vercel.app/'+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        listCollection = await res.json()
    }catch(e){
        console.error("Não foi possível criar a tarefa: " + e)
        return undefined
    }
    return listCollection
}

export const changeTask = async (listCollection:List,taskName:string,props:keyof Task,value:string | boolean) => {
    const indexTask = listCollection.tasks.findIndex((item)=>item.title == taskName)
    if(props == 'done' && typeof value == 'boolean'){
        listCollection.tasks[indexTask]['done'] = value
    }else if(typeof value =='string'){
        listCollection.tasks[indexTask]['title'] = value
    }
    // console.log('oioi')
    // for(let i in listCollection.tasks[indexTask]){
    //     if(typeof listCollection.tasks[indexTask][i] == typeof value){
    //         console.log(i,'rer')
    //     }
    // }
    try{
        const res = await fetch('https://to-do-back.vercel.app/'+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        listCollection = await res.json()
    }catch(e){
        console.error("Não foi possível alterar a tarefa: " + e)
        return undefined
    }
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