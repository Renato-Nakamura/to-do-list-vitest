import { expect, it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import InputItemVue from "../InputItem.vue";
describe("input", () => {
  const wrapper = mount(InputItemVue);
  const input = wrapper.find("input");
  const button = wrapper.find("button");
  it("renders properly", () => {
    expect(input && button).toBeTruthy();
  });
  it("sends text", async () => {
    await input.setValue("nova task");
    await button.trigger("click");
    const emit = wrapper.emitted("text");
    expect(emit).toBeTruthy();
    if(emit) expect(emit[0]).toContain("nova task");
  });
  it("clear input", async () => {
    await input.setValue("nova task");
    await button.trigger("click");
    const emit:any = wrapper.emitted("text");
    await emit[0][1]();
    expect(input.element.value).toBe("");
  });
});
