import { describe,it,expect } from "vitest";
import { mount } from "@vue/test-utils";
import TasksViewVue from "../TasksView.vue";

describe('TasksView',()=>{
    it('renders properly',()=>{
        const wrapper = mount(TasksViewVue,{props:{taskCollection:'Teste_Lista_Tarefas'}})
        expect(wrapper.text()).toContain('Teste Lista Tarefas')
    })
})