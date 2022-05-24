import { expect, describe, test, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import AppSongItem from "@/components/SongItem.vue";
import Icon from "@/directives/icon";
vi.mock("@/includes/firebase", () => ({}));

describe("HomeView.vue", () => {
  test("render song items list", () => {
    const songs = [{}, {}, {}];
    HomeView.methods.getSongs = () => false;
    const wrapper = shallowMount(HomeView, {
      data() {
        return {
          songs,
        };
      },
      global: {
        directives: {
          Icon,
        },
      },
    });
    const items = wrapper.findAllComponents(AppSongItem);
    expect(items).toHaveLength(3);

    items.forEach((item, index) => {
      expect(item.props().song).toEqual(songs[index]);
    });
  });
});
