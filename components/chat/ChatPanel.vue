<template>
  <div
    class="absolute bottom-4 right-4 z-10 rounded-md bg-gray-50 shadow-lg border border-gray-300 transition-all"
  >
    <div class="flex h-96 divide-x divide-gray-300">
      <div
        v-if="loading"
        class="w-64 flex flex-col justify-center items-center px-1 py-3 relative overflow-y-auto"
      >
        <svg
          class="animate-spin w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25 stroke-black fill-none"
            cx="12"
            cy="12"
            r="10"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div
        v-else-if="messagedUsers.length"
        class="w-64 flex flex-col px-1 py-3 relative overflow-y-auto"
      >
        <UserPreview
          v-for="messagedUser in messagedUsers"
          :key="messagedUser.username"
          :user="messagedUser"
          :selected="selectedUserPreview === messagedUser"
          @select="onUserPreviewSelection(messagedUser)"
        />
      </div>
      <div
        v-else
        class="relative w-64 flex flex-col justify-center items-center italic text-gray-400"
      >
        You have not messaged anyone yet.
      </div>

      <div
        v-if="selectedUserPreview"
        class="w-96 flex justify-center items-center relative"
      >
        <ChatBox :user="selectedUserPreview" @input="onSendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../../socket';

import UserPreview from './UserPreview.vue';
import ChatBox from './ChatBox.vue';

export default {
  name: 'ChatPanel',
  components: {
    UserPreview,
    ChatBox,
  },
  data() {
    return {
      selectedUserPreview: null,
      messagedUsers: [],
      loading: true,
    };
  },
  created() {
    const initProps = (user) => {
      user.unreadMessages = 0;
    };

    // Performed first time a user connects
    socket.on('list messaged users', (messagedUsers) => {
      messagedUsers.forEach((messagedUser) => {
        messagedUser.messages.forEach((message) => {
          message.fromSelf = message.from === socket.username;
        });

        for (const user of this.messagedUsers) {
          if (user.username === messagedUser.username) {
            user.messages = messagedUser.messages;
            return;
          }
        }

        messagedUser.self = messagedUser.username === socket.username;
        initProps(messagedUser);

        this.messagedUsers.push(messagedUser);
      });
      this.messagedUsers.sort((a, b) => {
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      this.loading = false;
    });

    socket.on('new messaged user', (messagedUser) => {
      initProps(messagedUser);
      this.messagedUsers.push(messagedUser);
    });

    socket.on('send message', ({ text, from, to }) => {
      for (const messagedUser of this.messagedUsers) {
        const fromSelf = socket.username === from;
        if (messagedUser.username === (fromSelf ? to : from)) {
          messagedUser.messages.push({
            text,
            fromSelf,
          });
          if (messagedUser !== this.selectedUserPreview) {
            ++messagedUser.unreadMessages;
          }
          break;
        }
      }
    });
  },
  destroyed() {
    socket.off('list messaged users');
    socket.off('new messaged user');
    socket.off('send message');
  },
  methods: {
    onSendMessage(text) {
      if (this.selectedUserPreview) {
        socket.emit('send message', {
          text,
          to: this.selectedUserPreview.username,
        });
        this.selectedUserPreview.messages.push({
          text,
          fromSelf: true,
        });
      }
    },
    onUserPreviewSelection(user) {
      if (this.selectedUserPreview !== user) {
        this.selectedUserPreview = user;
        user.unreadMessages = 0;
      } else {
        this.selectedUserPreview = null;
      }
    },
  },
};
</script>
