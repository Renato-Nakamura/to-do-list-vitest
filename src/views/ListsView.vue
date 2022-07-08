<script lang="ts">
import ListItem from "@/components/ListItem.vue";
import { createList } from "@/services/listsService";
import InputItem from "../components/InputItem.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ListItem,
    InputItem,
  },
  methods: {
    callCreateList(listTitle:string,clearFunction:Function){
        const res = createList(listTitle)
        clearFunction()
        if(res) this.$router.push('/list/'+listTitle)
    },
  },
})
</script>

<template>
  <h1>Listas Favoritas</h1>
  <span>Aqui estão as suas listas de afazeres favoritas</span>
  <InputItem @text="callCreateList"></InputItem>
  <ListItem listTitle="Teste_de_oie" />
</template>
