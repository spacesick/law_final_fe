<template>
  <h1>Index</h1>
</template>

<script>
export default {
  name: 'IndexPage',
  beforeMount() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/auth/register')
    }
  },
}
</script>
