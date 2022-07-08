import { expect, it, describe } from "vitest";
import { createList, createTask, getList } from "../listsService";
import {add_} from '../../composables/utils'

describe("List Service", () => {
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
});
