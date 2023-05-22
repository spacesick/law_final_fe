<template>
  <div
    class="relative w-full h-full flex flex-col items-center justify-between"
  >
    <div
      class="flex flex-row items-center self-start px-4 py-3 bg-gray-50/90 backdrop-blur-sm"
    >
      <h2 class="text-lg font-medium text-gray-900">
        {{ user.username }}
      </h2>
    </div>

    <div
      class="w-full h-full overflow-y-auto py-2 overscroll-contain border-t border-b border-gray-200 bg-gray-100 rounded-xl text-white text-sm"
    >
      <ul>
        <li
          v-for="(message, index) in user.messages"
          :key="index"
          class="px-2 py-1"
        >
          <div v-if="message.fromSelf" class="flex justify-end ml-32">
            <div
              class="bg-blue-800 rounded-tr-lg rounded-l-lg px-2 py-2 text-start break-words overflow-hidden"
            >
              {{ message.text }}
            </div>
          </div>
          <div v-else class="flex justify-start mr-32">
            <div
              class="bg-gray-800 rounded-tl-lg rounded-r-lg px-2 py-2 break-words overflow-hidden"
            >
              {{ message.text }}
            </div>
          </div>
        </li>
        <li ref="bottom"></li>
      </ul>
    </div>

    <div
      class="flex flex-row w-full justify-center items-center text-sm font-medium"
    >
      <form
        class="w-full h-full items-end flex divide-x"
        @submit.prevent="onSubmit"
      >
        <input
          v-model="input"
          placeholder="Say hello!"
          class="relative block w-full appearance-none px-4 py-3 font-normal text-gray-900 placeholder-gray-400 bg-gray-50 focus:z-10 focus:border-none focus:outline-none"
          type="text"
        />
        <button :disabled="!isValidInput" class="self-center px-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-8 h-8 p-2 fill-gray-600 rounded-md hover:bg-slate-200 transition-all"
          >
            <path
              d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import socket from '../../socket';

export default {
  name: 'ChatBox',
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      input: '',
    };
  },
  computed: {
    isValidInput() {
      return this.input.length > 0;
    },
    isMessageBySelf(message) {
      return message.self === socket.username;
    },
  },
  mounted() {
    this.$refs.bottom.scrollIntoView();
  },
  updated() {
    this.$refs.bottom.scrollIntoView();
  },
  methods: {
    onSubmit() {
      this.$emit('input', this.input);
      this.input = '';
      socket.emit();
    },
  },
};
</script>
