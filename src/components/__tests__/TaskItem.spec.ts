import { mount } from "@vue/test-utils";
import { it,expect, describe } from "vitest";
import TaskItemVue from "../TaskItem.vue";

describe('TaskItem component',()=>{
    const task ={
        title:"limpar a casa",
        done:false
    }
    it('renders properly',()=>{
        const wrapper = mount(TaskItemVue,{props:{task: task}})
        expect(wrapper.find('input').element.checked).toBe(task.done)
    })
})