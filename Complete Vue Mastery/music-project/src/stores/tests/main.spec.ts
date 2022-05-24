import {setActivePinia, createPinia} from "pinia";
import {describe, expect, test, vi} from "vitest";
import { useMainStore } from "@/stores/main";

vi.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
}));

describe("Pinia Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("toogleAuth mutation sets userLoggedIn to true", () => {
    const mainStore = useMainStore();
    expect(mainStore.userLoggedIn).toBe(false);
    mainStore.toggleAuth();
    expect(mainStore.userLoggedIn).toBe(true);
  });

  test("login action sets userLoggedIn to true", async () => {
    const mainStore = useMainStore();

    expect(mainStore.userLoggedIn).toBe(false);
    await mainStore.login({email: "", password: ""});
    expect(mainStore.userLoggedIn).toBe(true);
  });
});