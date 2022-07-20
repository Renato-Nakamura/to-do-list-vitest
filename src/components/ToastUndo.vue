<template>
  <div class="container">
    <span> {{ task?.title }} Deletado com sucesso</span>
    <button class="action" @click.stop="clicked" v-if="disabled">SEND!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { createTask } from "@/services/listsService";
import type { List } from "@/composables/utils";
export default defineComponent({
  methods: {
    clicked() {
        this.disabled = false
        const res = createTask(this.task?.title,this.listCollection)
      this.$emit("confirm",res);
    },
  },
  props:{
    task:Object,
    listCollection:Object as PropType<List>
  },
  data(){
    return {
        disabled:true
    }
  }
});
</script>
