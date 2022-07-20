<script lang="ts">
import { defineComponent } from "vue";
import { remove_, type Task } from "@/composables/utils";
import type { List } from "@/composables/utils";
import TaskItem from "../components/TaskItem.vue";
import InputItem from "../components/InputItem.vue";
import { getList, createTask, saveRecentLists, removeFromRecentLists, changeTask, removeTask } from "@/services/listsService";
import { useToast } from "vue-toastification";
import ToastUndo from "../components/ToastUndo.vue"

export default defineComponent({
    async beforeMount() {
    this.listName = this.$route?.params.collection.toString();
    const res = await getList(this.listName);
    if(!res){
      removeFromRecentLists(this.listName)
      this.listCollection = undefined
      return
    }
    this.listCollection = res
    saveRecentLists(this.listName)
  },
  methods: {
    remove_,
    createTask,
    changeTask,
    async callCreateTask(text:string, clearFunction:Function){
      const a = await createTask(text,this.listCollection)
      this.updateTasks( a)
      clearFunction()
    },
    updateTasks(value:List | undefined | null){
      this.listCollection =  JSON.parse(JSON.stringify(value))
      console.log(this.listCollection)
    },
    deleteRequest(task:Task,index:number){
      console.log(task)
      removeTask(this.listCollection,task._id)
      this.toast({component:ToastUndo,
      listeners: {
        confirm: async (res:any)=> {
          console.log('desfez', await res)
          this.updateTasks(await res)
          }
      },
      props:{
        task:task,
        listCollection:this.listCollection
      }
      })
      // return (event:any)=>{
      //   console.log('task',task)
      //   removeTask(this.listCollection,task._id)
      // }
      // return (event:any)=>{
      //   console.log('oioi',e,event)
      //   let pX = event.changedTouches?event.changedTouches[0].clientX :event.x
      //   this.positionX = {
      //     position : pX,
      //     index :e
      //     }
      //     console.log(this.positionX)
      // }
    },
  },
  components: {
    TaskItem,
    InputItem,
  },
  data() {
    return {
      listName: "",
      listCollection: null as List | undefined | null,
      positionX :{},
      toast: useToast()
    };
  },

});
</script>

<template>
  <div v-if="listCollection" class="flex flex-col h-full">
    <div class="mx-auto mb-10">
      <h1 class="text-5xl text-center py-5 mt-20">
        {{ remove_(listCollection.listTitle) }}
      </h1>
      <InputItem @text="callCreateTask" buttonName="ADICIONAR"></InputItem>
    </div>
    <div v-for="(tasks, i) in listCollection.tasks" class="flex justify-center">
      <!-- <div class="relative h-10  " v-touch:drag="swipeDelete(i, 'aa')">
        <div
          class="absolute w-full"
          :style="[
            i == positionX.index ? { left: positionX.position + 'px' } : '',
          ]"
        >
          <TaskItem
        v-touch:swipe.right="swipeDelete(tasks, i)"
            :task="tasks"
            :listCollection="listCollection"
            :key="tasks.title"
          ></TaskItem>
        </div>
      </div> -->
      <!-- <Transition> -->
      <TaskItem
        :task="tasks"
        :listCollection="listCollection"
        :key="tasks._id"
      ></TaskItem>
      <!-- <div class="relative">
        <Popper arrow class=" absolute top-7 ">
          <button >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <template #content>
            <button  class="flex items-center gap-1"><i class="fa-solid fa-trash"></i> Delete </button>
          </template>
        </Popper>
      </div> -->
      <div class="relative">
        <button
          v-on:click="deleteRequest(tasks, i)"
          class=" absolute top-7 w-8"
        >
          <i class="fa-solid fa-trash  text-[color:var(--primary)]"></i>
        </button>
      </div>
      <!-- </Transition> -->
    </div>
  </div>
  <div v-else-if="listCollection === undefined">
    <div class="mx-auto mb-10 flex flex-col items-center">
      <h1 class="text-5xl text-center py-5 mt-20">
        {{ remove_(listName) }}
      </h1>
      <h2 class="text-xl text-center mt-5">
        Parece que essa lista não existe :(
      </h2>
      <span class="text-sm my-2">Tente criar a sua lista na tela inicial!</span>
      <RouterLink to="/">
        <button
          class="bg-[color:var(--primary)] text-[color:var(--quaternary)] font-bold px-3 py-1"
        >
          Voltar
        </button>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <!-- <p>Carregando</p> -->
    <div class="mx-auto mb-10 flex flex-col items-center">
      <h1 class="text-5xl text-center py-5 mt-20">
        {{ remove_(listName) }}
      </h1>
      <InputItem
        @text="callCreateTask"
        buttonName="ADICIONAR"
        :disabled="true"
      ></InputItem>
    </div>
    <div class="animate-pulse flex flex-col items-center mt-16">
      <div
        v-for="i of [1, 2, 3, 4, 5]"
        class="h-10 bg-[color:var(--tertiary)] rounded w-64 my-1"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
