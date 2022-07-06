<template>
  <div>
    <input @keyup.enter="send(teste)" v-model="teste" type="text" />
    <button @click="send(teste)">Enviar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sendText: Function,
  },
  data() {
    return {
        teste: ''
    }
  },
    methods: {
        send(text:string){
            console.log(text)
            
        },
  },
});

</script>

<style scoped></style>
