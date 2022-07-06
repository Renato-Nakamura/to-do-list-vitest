<script lang="ts">
import { defineComponent } from 'vue'
interface TaskInterface {
    name:String,
    done:boolean
}
export default defineComponent({
    setup() {
        
    },
    props:{
        task: Object
    },
})
</script>

<template>
    <h3>{{task?.title}}</h3>
    <span v-if="task?.done">Feito, {{task?.done}}</span>
</template>