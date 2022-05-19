<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="index"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
//import { useMainStore } from "./../stores/main";
import AppUpload from "@/components/Upload.vue";
import { auth, songsCollection } from "@/includes/firebase";
import CompositionItem from "@/components/Composition.vue";
export default {
  name: "manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  /*beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },*/
  async created() {
    const snapshost = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshost.forEach(this.addSong);
  },
  data() {
    return {
      songs: [],
      unsaveFlag: false,
    };
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modifiedName = values.modifiedName;
      this.songs[index].genre = values.genre;
      console.log("updated song");
      console.log(index);
      console.log(values);
    },
    removeSong(index: number) {
      this.songs.splice(index, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsaveFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsaveFlag) {
      next();
    } else {
      const leave = confirm(
        "You have unsave changes. Are you sure you want to leave?"
      );
      next(leave);
    }
  },
  /*beforeRouteEnter(to, from, next) {
    const store = useMainStore();

    if (store.userLoggedIn) {
      next();
    } else {
      next({name: "home"});
    }
    
  }*/
};
</script>

<style></style>
