<script lang="ts">
import { defineComponent } from "vue";
import { remove_ } from "@/composables/utils";
import type { List } from "@/composables/utils";
import TaskItem from "../components/TaskItem.vue";
import InputItem from "../components/InputItem.vue";
import { getList, createTask, saveRecentLists, removeFromRecentLists, changeTask } from "@/services/listsService";

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
      this.updateTasks( await createTask(text,this.listCollection))
      clearFunction()
    },
    updateTasks(value:List | undefined | null){
      this.listCollection =  JSON.parse(JSON.stringify(value))
    }
  },
  components: {
    TaskItem,
    InputItem,
  },
  data() {
    return {
      listName: "",
      listCollection: null as List | undefined | null,
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
    <div v-for="tasks in listCollection.tasks" class="">
      <TaskItem
        :task="tasks"
        :listCollection="listCollection"
        :key="tasks.title"
      ></TaskItem>
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
      <InputItem @text="callCreateTask" buttonName="ADICIONAR" :disabled="true"></InputItem>

    </div>
    <div class="animate-pulse flex flex-col items-center mt-16">
      <div v-for="i of [1,2,3,4,5]" class="h-10 bg-[color:var(--tertiary)] rounded w-64 my-1"></div>
    </div>
  </div>
</template>
