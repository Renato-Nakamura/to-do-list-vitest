<script lang="ts">
import { defineComponent } from "vue";
import { remove_ } from "@/composables/utils";
import TaskItem from "../components/TaskItem.vue";
import InputItem from "../components/InputItem.vue"
import InputItem1 from "../components/InputItem.vue" 
export default defineComponent({
  setup() {},
  props: {
    taskCollection: String,
  },
  methods: {
    remove_,
  },
  components: {
    TaskItem,
    InputItem,
    InputItem1
},
  data(){
    return{
         taskMock: {
          title: 'teste mock',
          done:true
      }
    }
  },
});
</script>

<template>
  <h1>{{ taskCollection ? remove_(taskCollection) : "" }}</h1>
  <InputItem1></InputItem1>
  <TaskItem :task="taskMock"></TaskItem>
</template>
