<template>
  <h1>About page</h1>
</template>

<script>
export default {
  name: "AppAbout",
  activated() {
    console.log("Home component activated");
  },
  deactivated() {
    console.log("Home component deactivated");
  },
};
</script>
