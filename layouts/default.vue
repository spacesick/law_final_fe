<template>
  <div>
    <AppHeader v-if="token" />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '../components/universal/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
}
</script>

<style></style>
