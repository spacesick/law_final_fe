<template>
  <div
    class="fixed bottom-4 z-10 rounded-md bg-gray-50 shadow-lg border border-gray-300 transition-all"
    :class="[opened ? 'right-4' : 'right-0']"
  >
    <div
      class="absolute py-4 z-20 -left-8 px-1 bottom-2 bg-gray-50 border-gray-300 hover:bg-slate-200 transition-all border-l border-t border-b rounded-l-md"
      @click="togglePanel()"
    >
      <svg
        v-if="opened"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="w-6 h-6 fill-gray-400 rounded-md"
      >
        <path
          fill-rule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="w-6 h-6 p-1 fill-gray-400 rounded-md"
      >
        <path
          fill-rule="evenodd"
          d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div v-if="opened" class="flex h-96 divide-x divide-gray-300">
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
        <input
          v-model="filterInput"
          placeholder="Search for someone"
          class="relative block w-full appearance-none px-4 py-2 mb-2 -mt-1 rounded-full text-sm font-normal text-gray-900 placeholder-gray-400 bg-gray-100 focus:z-10 focus:border-none focus:outline-none"
          type="text"
        />
        <UserPreview
          v-for="messagedUser in filteredMessagedUsers"
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
      filterInput: '',
      loading: true,
      opened: true,
    };
  },
  computed: {
    filteredMessagedUsers() {
      return this.messagedUsers.filter((messagedUser) => {
        return messagedUser.username
          .toLowerCase()
          .includes(this.filterInput.toLowerCase());
      });
    },
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
    togglePanel() {
      this.opened = !this.opened;
    },
  },
};
</script>
