<script lang="ts">
import { defineComponent } from "vue";
import InputItem from "./InputItem.vue";
import { changeTask } from "@/services/listsService";
export default defineComponent({
  props: {
    task: Object,
    listName: String,
  },
  emits: ["checkbox"],
  components: { InputItem },
  methods: {
    changeTask,
    updateText(text:string){
        changeTask(this.listName ? this.listName : '', this.task?.title, 'title', text)
    }
  },
});
</script>

<template>
  <div>
    <input
      type="checkbox"
      name="done"
      id="done"
      :checked="task?.done"
      @click="
        changeTask(listName ? listName : '', task?.title, 'done', !task?.done)
      "
    />
    <InputItem :value="task?.title" @text="updateText"></InputItem>
    <!-- <input type="text" :value="task?.title" @keyup.enter=""> -->
    <!-- <span v-if="task?.done">Feito, {{task?.done}}</span> -->
  </div>
</template>
