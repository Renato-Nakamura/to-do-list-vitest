import { expect, it, describe } from "vitest";
import { createList, getList } from "../listsService";

describe('List Service', ()=>{
    it('get Collection list',()=>{
        const collection = getList('example')
        expect(collection).toBeTruthy()
        expect(collection?.listTitle).toBe('example')
    })
    it('create List',()=>{
        const listTitle = "example vitest"
        const collection = createList(listTitle)
        expect(collection).toBeTruthy()
        expect(collection?.listTitle).toBe(listTitle)
    })
})