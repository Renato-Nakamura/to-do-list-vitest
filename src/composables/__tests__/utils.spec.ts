import { it, expect, describe } from "vitest";
import { add_, remove_ } from "../utils";

describe('utils', ()=>{
    it('removes _ ', ()=>{
        expect(remove_('batata_quente')).toBe('batata quente')
        expect(remove_('lista_de_compras')).toBe('lista de compras')
    })
    it('adds _',()=>{
        expect(add_('lista de compras')).toBe('lista_de_compras')
    })
})