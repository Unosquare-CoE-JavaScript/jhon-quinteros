import { describe, expect, test, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Auth from "@/components/Auth.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

const storeMock = {
  authModalShow: true,
  toggleAuthModalShow() {
    this.authModalShow = !this.authModalShow;
  }
};

vi.mock("@/stores/main", () => ({
  useMainStore() {
    return storeMock;
  }
}));

describe("Auth component", () => {
  test("Auth component renders", () => {
    const wrapper = shallowMount(Auth);
    const modalHidden = wrapper.find("#modal");

    expect(modalHidden.classes("hidden")).toBe(false);
    expect(wrapper.findComponent(LoginForm).exists()).toBe(true);
    expect(wrapper.findComponent(RegisterForm).exists()).toBe(false);
  });

  test("Auth component change to register tab", async () => {
    const wrapper = shallowMount(Auth);
    const modalHidden = wrapper.find("#modal");

    expect(modalHidden.classes("hidden")).toBe(false);
    expect(wrapper.findComponent(LoginForm).exists()).toBe(true);
    expect(wrapper.findComponent(RegisterForm).exists()).toBe(false);

    const registerLink = wrapper.get("#register");
    await registerLink.trigger("click");
    
    expect(wrapper.findComponent(LoginForm).exists()).toBe(false);
    expect(wrapper.findComponent(RegisterForm).exists()).toBe(true);
  });
});