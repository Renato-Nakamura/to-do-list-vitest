<script lang="ts">
import { defineComponent } from "vue";
import { remove_ } from "@/composables/utils";
import type { List,Task } from "@/composables/utils";
import TaskItem from "../components/TaskItem.vue";
import InputItem from "../components/InputItem.vue";
import { getList, createTask } from "@/services/listsService";

export default defineComponent({
  methods: {
    remove_,
    createTask,
     callCreateTask(text:string, clearFunction:Function){
      this.listCollection =  JSON.parse(JSON.stringify(createTask(text,this.listName)))
      // text = ''
      clearFunction()
    }
  },
  components: {
    TaskItem,
    InputItem,
  },
  data() {
    return {
      listName: "",
      listCollection: {} as List | undefined,
    };
  },
  beforeMount() {
    this.listName = this.$route?.params.collection.toString();
    const res = getList(this.listName);
    this.listCollection = res && res.listTitle? res: undefined
  },
});
</script>

<template>
  <div v-if="listCollection">
    <h1>
      {{
       remove_(listCollection.listTitle)
      }}
    </h1>
    <InputItem @text="callCreateTask"></InputItem>
    <div v-for=" task in listCollection.tasks">
    <TaskItem :task="task"></TaskItem>
    </div>
  </div>
  <div v-else>
    <h1>Não foi possível encontrar a lista</h1>
  </div>
</template>
