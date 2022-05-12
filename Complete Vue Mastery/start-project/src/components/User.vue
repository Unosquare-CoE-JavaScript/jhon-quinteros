<template>
  <p>The user is {{age}} years old</p>
  <button type="button" @click="onClickAge">Update age</button>
</template>

<script lang="ts">
  export default {
    name: "User",
    props: {
      age: {
        type: [Number, String],
        //required: true,
        //default: 20
        validator(value: any) {
          return value < 130;
        }
      }
    },
    emits: ["age-change"],
    methods: {
      onClickAge() {
        this.$emit("age-change", 3);
      }
    }
  }
</script>
