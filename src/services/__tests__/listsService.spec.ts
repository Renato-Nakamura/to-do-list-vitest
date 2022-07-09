import { expect, it, describe } from "vitest";
import { createList, createTask, getList, getRecentLists, removeFromRecentLists, saveRecentLists } from "../listsService";
import {add_} from '../../composables/utils'

describe("List Service", () => {
  const title = 'teste vitest'

  it("get Collection list", () => {
    const listTitle = "example";
    const collection = getList(listTitle);
    expect(collection).toBeTruthy();
    expect(collection?.listTitle).toBe(listTitle);
  });
  it("create List", () => {
    const listTitle = "example vitest";
    const collection = createList(listTitle);
    expect(collection).toBeTruthy();
    expect(collection?.listTitle).toBe(add_(listTitle));
  });
  it("adds task", () => {
      const listTitle = "example";
      const taskTitle = "limpar";
    const response = createTask(taskTitle,listTitle);
    expect(typeof response).toBe("object")
  });
  it('saves recent lists in localStorage', ()=>{
    saveRecentLists(title)
    expect(localStorage.getItem('lists')?.indexOf(title)).toBeGreaterThan(-1)
  })
  it('get recent lists from localStorage',()=>{
    const lists = getRecentLists()
    expect(lists).toContain(title)
  })
  it('remove recent list from localStorage', ()=>{
    removeFromRecentLists(title)
    expect(localStorage.getItem('lists')).toBe('[]')
  })
});
