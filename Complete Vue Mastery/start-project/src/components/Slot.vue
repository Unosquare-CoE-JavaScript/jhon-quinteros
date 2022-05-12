<template>
  <AppForm>
    <div class="help">
      <p>This is some help text.</p>
    </div>
    <div class="fields">
      <input type="text" placeholder="email">
      <input type="text" placeholder="username">
      <input type="password" placeholder="password">
    </div>
    <div class="buttons">
      <button type="submit">Submit</button>
    </div>
  </AppForm>
  <AppForm>
    <div class="help">
      <p>Contanct help text.</p>
    </div>
    <div class="fields">
      <input type="text" placeholder="name">
      <input type="text" placeholder="message">
    </div>
    <div class="buttons">
      <button type="submit">Submit</button>
    </div>
  </AppForm>
</template>

<script>
import AppForm from "./Form.vue";

export default {
  name: "AppSlot",
  components: {
    AppForm
  }
}
</script>

<style>

</style>