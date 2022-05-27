import { expect, describe, test } from "vitest";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";

describe("SongItem.vue", () => {

  test("render song, display name", () => {
    const song = {
      docId: "1",
      modifiedName: "Test song",
      displayName: "Test song",
      commentCount: 1,
    };
    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });
    const displayName = wrapper.get(".text-gray-500");

    expect(displayName.text()).toBe("Test song");
  });

  test("render song.docId if attribute", () => {
    const song = {
      docId: "1",
      modifiedName: "Test song",
      displayName: "Test song",
      commentCount: 0,
    };
    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });
    expect(wrapper.attributes("id")).toBe("song-id-1");
  });
});
