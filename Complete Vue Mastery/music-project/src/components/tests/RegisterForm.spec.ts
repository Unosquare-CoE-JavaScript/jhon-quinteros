import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import RegisterForm from "@/components/RegisterForm.vue";
import VeeValidatePlugin from "@/includes/validation";

vi.mock("@/stores/main", () => ({
  useMainStore() {
    return {
      register() {
        return Promise.resolve();
      }
    }
  }
}));

describe("RegisterForm", () => {
  test("RegisterForm render", async () => {
    const wrapper = mount(RegisterForm, {
      global: {
        plugins: [VeeValidatePlugin]
      }
    });
    expect(wrapper.find("#alert-msg").exists()).toBe(false);
  });
});