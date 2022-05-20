import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
import { Howl } from "howler";
import { formatTime } from "@/includes/helper";
export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  actions: {
    toggleAuthModalShow() {
      this.authModalShow = !this.authModalShow;
    },
    toggleAuth() {
      this.userLoggedIn = !this.userLoggedIn;
    },
    async register(values: any) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await usersCollection.doc(userCredentials.user?.uid).set({
        name: values.name,
        email: values.email,
        country: values.country,
        age: values.age,
      });
      await userCredentials.user?.updateProfile({
        displayName: values.name,
      });
      this.userLoggedIn = !this.userLoggedIn;
    },
    initLogin() {
      const user = auth.currentUser;
      if (user) {
        this.userLoggedIn = !this.userLoggedIn;
      }
    },
    async login(values: any) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signout() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
    async newSong(song: any) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }
      this.currentSong = song;
      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });
      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(() => {
          this.progress();
        });
      });
    },
    progress() {
      this.seek = formatTime(this.sound.seek());
      this.duration = formatTime(this.sound.duration());
      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;
      if (this.sound.playing()) {
        requestAnimationFrame(() => {
          this.progress();
        });
      }
    },
    toggleAudio() {
      console.log("entra player");
      if (!this.sound.playing) {
        return;
      }
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }
      const { x, width } = event.currentTarget.betBoundingClientRect();
      const clickX = event.clentX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;
      this.sound.seek(seconds);
      this.sound.once("seek", () => {
        this.progress();
      });
    },
  },
});
