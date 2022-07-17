<script lang="ts">
import { defineComponent, type PropType } from "vue";
import InputItem from "./InputItem.vue";
import { changeTask } from "@/services/listsService";
import type { List } from "@/composables/utils";

export default defineComponent({
  props: {
    task: Object,
    listCollection: Object as PropType<List>,
  },
  emits: ["checkbox"],
  components: { InputItem },
  methods: {
    changeTask,
    updateText(text:string){
        if(this.listCollection)changeTask(this.listCollection, this.task?._id, 'title', text)
    }
  },
});
</script>

<template>
  <div style="position: relative;" class="my-3">
    <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
      <defs>
        <linearGradient
          id="boxGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="25"
          y2="25"
        >
          <stop offset="0%" stop-color="var(--primary)" />
          <stop offset="100%" stop-color="var(--tertiary)" />
        </linearGradient>

        <linearGradient id="lineGradient">
          <stop offset="0%" stop-color="var(--primary)" />
          <stop offset="100%" stop-color="var(--tertiary)" />
        </linearGradient>

        <path
          id="todo__line"
          stroke="url(#lineGradient)"
          d="M21 12.3h206v0.1z"
        ></path>
        <path
          id="todo__box"
          stroke="url(#boxGradient)"
          d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
        ></path>
        <path
          id="todo__check"
          stroke="url(#boxGradient)"
          d="M10 13l2 2 5-5"
        ></path>
        <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
      </defs>
    </svg>
    <div class="todo-list ">
      <label style="position: relative;">
        <input
          class="mb-2 todo__state"
          type="checkbox"
          name="done"
          id="done"
          :checked="task?.done"
          @click="
            listCollection &&
              changeTask(listCollection, task?._id, 'done', !task?.done)
          "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 200 25"
          class="todo__icon"
        >
          <use xlink:href="#todo__line" class="todo__line"></use>
          <use xlink:href="#todo__box" class="todo__box"></use>
          <use xlink:href="#todo__check" class="todo__check"></use>
          <use xlink:href="#todo__circle" class="todo__circle"></use>
        </svg>
        <div class="aaa"></div>
      </label>
          <InputItem 
            :value="task?.title"
            @text="updateText"
            class="todo__text ml-10 input-abs"
          ></InputItem>
    </div>

    <!-- <input type="text" :value="task?.title" @keyup.enter=""> -->
    <!-- <span v-if="task?.done">Feito, {{task?.done}}</span> -->
  </div>
</template>

<style scoped>
.input-abs{
  position: absolute;
  right: auto;
}
.aaa{
  width: 200px;
  height: 1px;
}
.todo-list {
  font-size: 20px;
  max-width: 15em;
  margin: auto;
  padding: 0.5em 2.2em 0.5em 1em;
}

.todo__state {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
}
.todo__text {
  color: #135156;
  transition: all 0.4s linear 0.4s;
}
.todo__icon {
  position: absolute;
  top: 2px;
  left: -10px;
  /* width: 100%; */
  height: auto;
  margin: auto;
  fill: none;
  stroke: var(--primary);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.todo__line,
.todo__box,
.todo__check {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.9, 0, 0.5, 1);
}
.todo__circle {
  stroke: var(--primary);
  stroke-dasharray: 1 6;
  stroke-width: 0;
  transform-origin: 13.5px 12.5px;
  transform: scale(0.4) rotate(0deg);
  -webkit-animation: none 0.8s linear;
  animation: none 0.8s linear;
}
@-webkit-keyframes explode {
  30% {
    stroke-width: 3;
    stroke-opacity: 1;
    transform: scale(0.8) rotate(40deg);
  }
  100% {
    stroke-width: 0;
    stroke-opacity: 0;
    transform: scale(1.1) rotate(60deg);
  }
}
@keyframes explode {
  30% {
    stroke-width: 3;
    stroke-opacity: 1;
    transform: scale(0.8) rotate(40deg);
  }
  100% {
    stroke-width: 0;
    stroke-opacity: 0;
    transform: scale(1.1) rotate(60deg);
  }
}
.todo__box {
  stroke-dasharray: 56.1053, 56.1053;
  stroke-dashoffset: 0;
  transition-delay: 0.16s;
}
.todo__check {
  stroke: var(--primary);
  stroke-dasharray: 9.8995, 9.8995;
  stroke-dashoffset: 9.8995;
  transition-duration: 0.32s;
}
.todo__line {
  stroke-dasharray: 168, 1684;
  stroke-dashoffset: 168;
}
.todo__circle {
  -webkit-animation-delay: 0.56s;
  animation-delay: 0.56s;
  -webkit-animation-duration: 0.56s;
  animation-duration: 0.56s;
}
.todo__state:checked ~ .todo__text {
  transition-delay: 0s;
  color: var(--primary);
  opacity: 0.6;
}
.todo__state:checked ~ .todo__icon .todo__box {
  stroke-dashoffset: 56.1053;
  transition-delay: 0s;
}
.todo__state:checked ~ .todo__icon .todo__line {
  stroke-dashoffset: -8;
}
.todo__state:checked ~ .todo__icon .todo__check {
  stroke-dashoffset: 0;
  transition-delay: 0.48s;
}
.todo__state:checked ~ .todo__icon .todo__circle {
  -webkit-animation-name: explode;
  animation-name: explode;
}

</style>
