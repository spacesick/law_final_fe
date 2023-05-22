<template>
  <div>
    <h1>Index</h1>
    <ChatPanel />
  </div>
</template>

<script>
import ChatPanel from '~/components/chat/ChatPanel.vue';

export default {
  name: 'IndexPage',
  components: {
    ChatPanel,
  },
  beforeMount() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/auth/login');
    }
  },
};
</script>
