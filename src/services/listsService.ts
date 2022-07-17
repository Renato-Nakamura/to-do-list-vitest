import { add_, type List,type Task } from "@/composables/utils";
import { useToast } from "vue-toastification";
const toast = useToast()
const BASE_URL = 'https://to-do-back.vercel.app/'
export const getList = async (collectionName:string) => {
    let list
    try{
        const res = await fetch(BASE_URL+collectionName,{
            method:"GET"
        })
        list = await res.json()
        if(list.message) throw list.message

    }
    catch(e){
        toast.error("Não foi possível acessar a Lista: " + e)
        return undefined
    }
    return list[0]
}

export const createList = async (listTitle:string)=> {
    listTitle = add_(listTitle)
    let list:List | any = {
        listTitle,
        created: Date.now(),
        tasks: [],
    }
    try{
        const res = await fetch(BASE_URL,{
            headers: { 'Content-type': 'application/json' },
            method:'POST',
            body: JSON.stringify(list)
        })
        list = await res.json()
        if(list.message) throw list.message
    }catch(e){

        toast.error("Não foi possível criar a Lista: " + e)
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
        const res = await fetch(BASE_URL+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        const resposta = await res.json()
        listCollection = {...resposta}
        // if((await res.json()).message) throw (await res.json()).message

    }catch(e){
        toast.error("Não foi possível criar a tarefa: " + e)
        return undefined
    }
    return listCollection
}

export const changeTask = async (listCollection:List,taskId:string,props:keyof Task,value:string | boolean) => {
    const indexTask = listCollection.tasks.findIndex((item)=>item._id == taskId)
    console.log(taskId,listCollection, indexTask)
    if(props == 'done' && typeof value == 'boolean'){
        listCollection.tasks[indexTask]['done'] = value
    }else if(typeof value =='string'){
        listCollection.tasks[indexTask]['title'] = value
    }

    try{
        const res = await fetch(BASE_URL+listCollection._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(listCollection)
        })
        const resposta = await res.json()
        listCollection = {...resposta}
        // if((await res.json()).message) throw (await res.json()).message
    }catch(e){
        toast.error("Não foi possível alterar a tarefa: " + e)
        return undefined
    }
    return listCollection
}

export const removeTask = async (list:List | null | undefined,taskId:string | undefined)=>{
    console.log(list, taskId)
    if(!list || !taskId) return
    const indexTask = list.tasks.findIndex((item)=>item._id == taskId)
    list.tasks.splice(indexTask,1)
    try{
        const res = await fetch(BASE_URL+list._id,{
            headers: { 'Content-type': 'application/json' },
            method:'PUT',
            body: JSON.stringify(list)
        })
        list = await res.json()
        // if((await res.json()).message) throw (await res.json()).message
    }catch(e){
        toast.error("Não foi possível alterar a tarefa: " + e)
        return undefined
    }
    return list
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
    if(index >= 0)listsArray.splice(index,1)
    localStorage.setItem('lists',JSON.stringify(listsArray))
}