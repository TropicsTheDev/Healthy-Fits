<template>
  <SignIn v-if="user !== null && user !== undefined" />
</template>

<script>
import User from "~/plugins/User";
export default {
  name: "PleaseSignIn",
  mixins: [User],
};
</script>

<style scoped></style>
