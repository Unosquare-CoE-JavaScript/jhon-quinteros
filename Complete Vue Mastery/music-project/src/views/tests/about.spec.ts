import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AboutView from "./../AboutView.vue";

describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = mount(AboutView);
    const title = wrapper.get("h1");

    expect(title.text()).toBe("This is an about page");
  });
});
