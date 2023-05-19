<template>
  <div class="min-w-screen min-h-screen">
    <AppHeader :token-exist="token" />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '~/components/universal/AppHeader.vue';

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
