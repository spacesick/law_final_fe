<template>
  <div
    class="relative w-full h-full flex flex-col items-center justify-between"
  >
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
  methods: {
    onSubmit() {
      this.$emit('input', this.input);
      this.input = '';
      socket.emit();
    },
  },
};
</script>
