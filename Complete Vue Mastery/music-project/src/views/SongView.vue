<template>
  <main>
    <!-- Music Header -->
    <section
      class="w-full mb-8 py-14 text-center text-white relative"
      id="comments"
    >
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="store.newSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ song.commentCount }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p4 mb-4"
            v-if="commentShowAlert"
            :class="commentVariant"
          >
            {{ commentMessage }}
          </div>
          <VeeForm
            :validation-schema="schema"
            @submit="addComment"
            v-if="store.userLoggedIn"
          >
            <VeeField
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            />
            <ErrorMessage name="comment" class="text-red-600" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="commentInSubmission"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docId"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { songsCollection, auth, commentsCollection } from "@/includes/firebase";
import { useMainStore } from "@/stores/main";

export default {
  name: "Song",
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({ name: "home" });
      return;
    }
    this.song = docSnapshot.data();
    const { sort } = this.$route.query;
    this.sort = sort === "1" || sort === "2" ? sort : "1";
    this.getComments();
  },
  data() {
    return {
      song: {},
      schema: {
        comment: "required|min:3",
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentVariant: "bg-blue-500",
      commentMessage: "Please wait!, your comment is being submitted",
      comments: [],
      sort: "1",
    };
  },
  computed: {
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  methods: {
    async addComment(values, context) {
      this.commentInSubmission = true;
      this.commentShowAlert = true;
      this.commentVariant = "bg-blue-500";
      this.commentMessage = "Please wait!, your comment is being submitted";

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);
      this.song.commentCount += 1;

      await songsCollection
        .doc(this.$route.params.id)
        .update({ commentCount: this.song.commentCount });

      this.getComments();

      this.commentInSubmission = false;
      this.commentVariant = "bg-green-500";
      this.commentMessage = "Comment added!";

      context.resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();
      this.comment = [];
      snapshots.forEach((document) => {
        this.comments.push({
          docId: document.id,
          ...document.data(),
        });
      });
    },
  },
  watch: {
    sort(newValue) {
      if (newValue === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newValue,
        },
      });
    },
  },
};
</script>
