<template>
  <p>The user is {{age}} years old</p>
</template>

<script lang="ts">
  export default {
    name: "User",
    props: ["age"]
  }
</script>
