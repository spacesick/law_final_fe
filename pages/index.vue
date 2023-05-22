<template>
  <div>
    <h1>Index</h1>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  beforeMount() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/auth/login');
    }
  },
};
</script>
