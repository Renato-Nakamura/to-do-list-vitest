import { describe, it, expect } from "vitest";
import {mount} from '@vue/test-utils'
import ListItemVue from "../ListItem.vue";
import { remove_ } from "@/composables/utils";

describe('ListItem component', ()=>{
    it('renders properly',()=>{
        const listTitle = 'Lista_de_compras'
        const wrapper = mount(ListItemVue,{props:{listTitle: listTitle}})
        expect(wrapper.text()).toContain(remove_(listTitle))
        expect(wrapper.find('button').exists()).toBe(true)
    })
})