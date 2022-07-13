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
    return{
        recentLists: []
    }
  },
  beforeMount() {
    const lists = getRecentLists();
    if (lists) this.recentLists = lists;
  },
});
</script>

<template>
  <h1>Crie uma lista de afazeres</h1>
  <InputItem @text="callCreateList"></InputItem>
  <span>Recentes</span>
  <div v-for="list in recentLists">
      <ListItem :listTitle="list" :key="list"/>
  </div>
</template>
