<script lang="ts">
export default {
  data() {
    return {
      firstName: "pepe",
      lastName: "Doe"
    };
  },
  methods: {
    fullName() {
      return `${this.firstName} ${this.lastName.toUpperCase()}`;
    },
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      {{fullName()}}
      <hr/>
      <label>First Name</label>
      <input type="text" v-model="firstName"/>
    </div>
  </header>
</template>
