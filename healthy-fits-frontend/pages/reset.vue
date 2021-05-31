<template>
  <main>
    <template v-if="!$route.query.token">
      <p>Sorry, you must supply a token</p>
      <RequestReset />
    </template>
    <template v-else>
      <p>Reset your password</p>
      <Reset :token="$route.query.token" />
    </template>
  </main>
</template>

<script>
export default {};
</script>

<style scoped></style>
