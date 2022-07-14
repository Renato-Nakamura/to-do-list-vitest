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
  <div v-if="listCollection">
    <h1>
      {{ remove_(listCollection.listTitle) }}
    </h1>
    <InputItem @text="callCreateTask"></InputItem>
    <div v-for="tasks in listCollection.tasks">
      <TaskItem
        :task="tasks"
        :listCollection="listCollection"
        :key="tasks.title"
      ></TaskItem>
    </div>
  </div>
  <div v-else-if="listCollection === undefined">
    <h1>Não foi possível encontrar a lista</h1>
  </div>
  <div v-else>
    <p>Carregando</p>
  </div>
</template>
