<template>
  <div class="container flex justify-between">
    <span> <strong>{{ task?.title.toUpperCase() }}</strong> :{{message}} </span>
    <button class="font-bold text-[color:var(--primary)]" @click.stop="clicked" v-if="disabled">Desfazer</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { createTask } from "@/services/listsService";
import type { List } from "@/composables/utils";
export default defineComponent({
  methods: {
    clicked() {
      this.message = " restaurado com sucesso"
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
        disabled:true,
        message:" deletado com sucesso"
    }
  }
});
</script>
