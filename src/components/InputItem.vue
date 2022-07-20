<template>
  <div class="flex flex-col items-center">
    <div class="border-solid border-b-2 border-[color:var(--primary)] mb-3 w-52">
      <input placeholder="Insira o nome da lista" @change="!buttonName && $emit('text', textInput,clear)" @keyup.enter="$emit('text', textInput,clear)" v-model="textInput" type="text" class="z-20 bg-transparent w-52" :disabled='disabled'/>
    </div>
    <button v-if="buttonName" class="bg-[color:var(--primary)] text-[color:var(--quaternary)] font-bold p-1 w-52 " @click="$emit('text', textInput,clear)" :disabled='disabled'>{{buttonName}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sendTextFunction: Function,
    value:String,
    buttonName:String,
    disabled:{
      type:Boolean,
      default: false
    }
  },
  watch:{
    value(newValue,oldValue){
      this.textInput = newValue
    }
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

<style scoped>
 input:focus{
    outline: none;
}
</style>
