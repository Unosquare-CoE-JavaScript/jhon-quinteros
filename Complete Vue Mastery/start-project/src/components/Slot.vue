<template>
  <AppForm>
    <template v-slot:help>
      <p>This is some help text.</p>
    </template>
    <template v-slot:fields>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
    </template>
    <template v-slot:button>
      <button type="submit">Submit</button>
    </template>
  </AppForm>
</template>

<script>
import AppForm from "./Form.vue";

export default {
  name: "AppSlot",
  components: {
    AppForm,
  },
};
</script>
