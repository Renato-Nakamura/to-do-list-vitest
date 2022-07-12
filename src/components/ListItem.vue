<script lang="ts">
import {remove_} from '../composables/utils'
export default {
  props: {
    listTitle: String,
  },
  methods:{
    remove_
  }
};
</script>
<template>
  <div>
    <RouterLink :to="listTitle?'/list/'+listTitle: '/'">
      <h2>{{ remove_(listTitle) }}</h2>
    </RouterLink>
      <!-- <button>Remove</button> -->
  </div>
</template>
