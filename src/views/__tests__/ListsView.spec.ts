import { describe,it,expect } from "vitest";
import { mount } from "@vue/test-utils";
import ListsViewVue from "../ListsView.vue";

describe('lists component', ()=>{
    it('renders properly',()=>{
        const wrapper = mount(ListsViewVue)
        expect(wrapper.text()).toContain('Listas Favoritas')
    })
})