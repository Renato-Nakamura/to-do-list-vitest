import { expect, it, describe } from "vitest";
import { createList, createTask, getList, getRecentLists, removeFromRecentLists, saveRecentLists } from "../listsService";
import {add_} from '../../composables/utils'

describe("List Service", () => {
  const title = 'teste vitest'
  const listCollection = {"_id":"62ccb315392013f029015634","listTitle":"example 222","created":123,"tasks":[]}

  it("get Collection list", async () => {
    const listTitle = "example";
    const collection = await getList(listTitle);
    expect(collection).toBeTruthy();
    expect(collection?.listTitle).toBe(listTitle);
  });
  it("create List", async () => {
    const listTitle = "example vitest";
    const collection = await createList(listTitle);
    expect(collection).toBeTruthy();
    expect(collection?.listTitle).toBe(add_(listTitle));
  });
  it("adds task", async () => {
      const listTitle = "example";
      const taskTitle = "limpar";
    const response = await createTask(taskTitle,listCollection);
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
