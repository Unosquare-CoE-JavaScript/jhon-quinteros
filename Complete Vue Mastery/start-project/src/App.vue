<script lang="ts">
export default {
  data() {
    return {
      firstName: "pepe",
      lastName: "Doe",
      middleName: "",
      age: 20,
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
      return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`;
    },
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        console.log("watch")
        this.age = 20
      }, 3000);
    }
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      {{fullName}}
      <hr/>
      <label>First Name</label>
      <input type="text" v-model.lazy.trim="firstName"/>
      <label>Middle Name</label>
      <input type="text" @keyup.enter="updateMiddleName"/>
      <label>Last Name</label>
      <input type="text" :value="lastName" @input.prevent="updateLastName('Last event triggered!', $event)"/>
      <br/>
      <label>Age</label>
      <input type="number" v-model.number="age"/>
      <button type="button" @click.ctrl="increase">Increment</button>
      <button type="button" v-on:click="decrease">Decrement</button>
      <p>{{ age }}</p>
    </div>
  </header>
</template>
