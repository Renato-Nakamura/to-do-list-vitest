<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import { createList, getRecentLists } from "@/services/listsService";
import InputItem from "../components/InputItem.vue";
import { defineComponent } from "vue";
import { add_ } from "@/composables/utils";

export default defineComponent({
  components: {
    ListItem,
    InputItem,
  },
  methods: {
    async callCreateList(listTitle: string, clearFunction: Function) {
      const res = await createList(listTitle);
      clearFunction();
      if (res) this.$router.push("/" + add_(listTitle));
    },
  },
  data() {
    return {
      recentLists: [],
    };
  },
  beforeMount() {
    const lists = getRecentLists();
    if (lists) this.recentLists = lists;
  },
});
</script>

<template>
  <div class="flex flex-col justify-around h-5/6">
    <div class="flex flex-col items-center">
      <h1 class="text-main text-[color:var(--primary)] text-7xl">MISTY</h1>
      <h2 class="text-[color:var(--primary)] text-2xl">
        Crie sua lista de tarefas
      </h2>
    </div>
    <InputItem class="mx-auto" @text="callCreateList" buttonName="CRIAR"></InputItem>
    <div></div>
  </div>
  <div class="flex flex-col items-center mt-20">
    <span>Recentes</span>
    <div v-for="list in recentLists">
      <ListItem :listTitle="list" :key="list" />
    </div>
  </div>
</template>

<style>
.text-main {
  font-family: "Montserrat Subrayada", sans-serif;
}
</style>
