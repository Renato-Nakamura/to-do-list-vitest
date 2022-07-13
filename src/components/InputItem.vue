<template>
  <div class="flex flex-col mx-auto w-60">
    <input placeholder="Insira o nome da lista" @keyup.enter="$emit('text', textInput,clear)" v-model="textInput" type="text" class="bg-transparent border-solid border-b-2 border-[color:var(--primary)] mb-3"/>
    <button class="bg-[color:var(--primary)] text-[color:var(--quaternary)] font-bold p-1" @click="$emit('text', textInput,clear)">CRIAR</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sendTextFunction: Function,
    value:String
  },
  data() {
    return {
      textInput: "",
    };
  },
  methods: {
    clear() {
      this.textInput = "";
    },
  },
  beforeMount(){
    if(this.value) this.textInput = this.value
  }
});
</script>

<style scoped></style>
