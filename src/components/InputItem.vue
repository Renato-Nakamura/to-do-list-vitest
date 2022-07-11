<template>
  <div>
    <input @keyup.enter="$emit('text', textInput,clear)" v-model="textInput" type="text" />
    <button @click="$emit('text', textInput,clear)">Enviar</button>
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
