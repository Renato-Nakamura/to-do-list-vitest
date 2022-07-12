<script lang="ts">
import { defineComponent, type PropType } from "vue";
import InputItem from "./InputItem.vue";
import { changeTask } from "@/services/listsService";
import type { List } from "@/composables/utils";

export default defineComponent({
  props: {
    task: Object,
    listCollection: Object as PropType<List>,
  },
  emits: ["checkbox"],
  components: { InputItem },
  methods: {
    changeTask,
    updateText(text:string){
        if(this.listCollection)changeTask(this.listCollection, this.task?.title, 'title', text)
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
      @click="listCollection &&
        changeTask(listCollection, task?.title, 'done', !task?.done)
      "
    />
    <InputItem :value="task?.title" @text="updateText"></InputItem>
    <!-- <input type="text" :value="task?.title" @keyup.enter=""> -->
    <!-- <span v-if="task?.done">Feito, {{task?.done}}</span> -->
  </div>
</template>
