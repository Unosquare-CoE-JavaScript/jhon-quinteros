<script lang="ts">
export default {
  data() {
    return {
      firstName: "pepe",
      lastName: "Doe",
      middleName: "",
      age: 20,
      isPurple: false,
      selectedColor: "",
      size: 150,
    };
  },
  methods: {
    decrease() {
      this.age--;
    },
    increase() {
      this.age++;
    },
    updateLastName(message: string, e: Event) {
      console.log(message);
      this.lastName = (e.target as HTMLInputElement).value;
    },
    updateMiddleName(event: Event) {
      this.middleName = (event.target as HTMLInputElement).value;
    },
  },
  computed: {
    fullName() {
      console.log("computed: ");
      return `${this.firstName} ${
        this.middleName
      } ${this.lastName.toUpperCase()}`;
    },
    circle_classes() {
      return {
        purple: this.isPurple,
      };
    },
    size_circle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        lineHeight: `${this.size}px`
      }
    }
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        console.log("watch");
        this.age = 20;
      }, 3000);
    },
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      {{ fullName }}
      <hr />
      <label>First Name</label>
      <input type="text" v-model.lazy.trim="firstName" />
      <label>Middle Name</label>
      <input type="text" @keyup.enter="updateMiddleName" />
      <label>Last Name</label>
      <input
        type="text"
        :value="lastName"
        @input.prevent="updateLastName('Last event triggered!', $event)"
      />
      <br />
      <label>Age</label>
      <input type="number" v-model.number="age" />
      <button type="button" @click.ctrl="increase">Increment</button>
      <button type="button" v-on:click="decrease">Decrement</button>
      <p>{{ age }}</p>
    </div>
  </header>
  <body>
    <label> <input type="checkbox" v-model="isPurple" /> Purple </label>
    <select v-model="selectedColor">
      <option value="">White</option>
      <option value="text-black">Black</option>
      <option value="text-orange">Orange</option>
    </select>
    <br />
    <input type="number" v-model="size" />
    <div
      class="circle"
      :class="[selectedColor, circle_classes]"
      :style="[
        size_circle,
        {
          transform: 'rotate(30deg)',
        },
      ]"
    >
      Hi!
    </div>
  </body>
</template>

<style scoped>
.circle {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: #45d619;
  text-align: center;
  color: #fff;
  line-height: 150px;
  font-size: 32px;
  font-weight: bold;
}

.purple {
  background-color: #767dea;
}

.text-black {
  color: #424242;
}

.text-orange {
  color: #ffc26f;
}
</style>
