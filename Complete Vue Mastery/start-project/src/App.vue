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
      mode: 1,
      birds: ["pigeons", "Eagles", "Doves", "Parrots"],
      people: [
        { name: "John", age: 20, message: "Hello world!" },
        { name: "Rick", age: 18, message: "I like pie." },
        { name: "Amy", age: 33, message: "Skydiving is fun!" },
      ],
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
    move() {
      const first: any = this.people.shift();
      this.people.push(first);
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
        lineHeight: `${this.size}px`,
      };
    },
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
      <hr />
      <h1>Handle of events</h1>
      <span>Full Name: {{ fullName }}</span>
      <br />
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
      <p>{{ age }}</p>
      <input type="number" v-model.number="age" />
      <button type="button" @click.ctrl="increase">Increment</button>
      <button type="button" v-on:click="decrease">Decrement</button>
    </div>
  </header>
  <body>
    <hr />
    <h1>Conditional Styles</h1>
    <label> Purple </label>
    <input type="checkbox" v-model="isPurple" />
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

    <hr />
    <h1>Conditional rendering</h1>

    <p v-if="mode == 1">Showing v-id directive content</p>
    <template v-else-if="mode == 2">
      <h3>Bonus content</h3>
      <p>Showing v-else-if content</p>
    </template>
    <p v-else>Showing the else contenct</p>

    <i v-show="mode == 1">v show</i>
    <br />
    <select v-model="mode">
      <option value="1">option 1</option>
      <option value="2">option 2</option>
      <option value="3">option 3</option>
    </select>

    <hr />
    <h1>Iterate Arrays</h1>

    <ul>
      <li v-for="(bird, index) in birds" :key="bird">
        {{ `${index} ${bird}` }}
      </li>
    </ul>

    <br />

    <ul>
      <li v-for="(person, index) in people" :key="person.name">
        {{ `${index} ${person.name}, age: ${person.age}` }}
      </li>
    </ul>

    <ul>
      <li v-for="(person, index) in people" :key="person.name">
        <div v-for="(value, key, index) in person" :key="index">
          {{ `${key}: ${value} - Index: ${index}` }}
        </div>
      </li>
    </ul>

    <button type="button" class="move" @click="move">Move to Bottom</button>
    <div class="card" v-for="person in people" :key="person.name">
      <h3>{{ person.name }}</h3>
      <p>{{ person.message }}</p>
      <input type="text" />
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

#app button {
  background-color: #899ff4;
  border-color: transparent;
  color: #fff;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 10px;
}

#app .card {
  width: 400px;
  margin: 15px auto;
  padding-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

#app input:focus {
  outline: 0;
}

#app input {
  font-weight: bold;
  width: 100%;
  font-size: 1em;
  padding: 5px 10px;
}
</style>
