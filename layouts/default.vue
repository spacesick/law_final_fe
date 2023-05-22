<template>
  <div class="min-w-screen min-h-screen">
    <AppHeader :token-exist="token" />
    <nuxt />
    <ChatPanel :token-exist="token" />
  </div>
</template>

<script>
import socket from '../socket';
import { parseJwt } from '~/store/auth';
import AppHeader from '~/components/universal/AppHeader.vue';
import ChatPanel from '~/components/chat/ChatPanel.vue';

export default {
  components: {
    AppHeader,
    ChatPanel
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },

  created() {
    const token = this.$store.state.auth.token;
    
    if (token) this.connectSocket(token);

    this.$store.subscribeAction((action, state) => {
      if (action.type === 'auth/setToken') {
        this.connectSocket(action.payload);
      } else if (action.type === 'auth/removeToken') {
        socket.disconnect();
      }
    });
  },
  methods: {
    connectSocket(token) {
      const parsedToken = parseJwt(token);
      socket.auth = {
        userId: parsedToken.user_id,
        username: parsedToken.username,
      };
      socket.userId = parsedToken.user_id;
      socket.username = parsedToken.username;
      socket.connect();
    },
  },
};
</script>
