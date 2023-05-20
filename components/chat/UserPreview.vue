<template>
  <div class="w-full text-sm font-medium">
    <button
      class="w-full flex justify-between px-2 py-2 mb-1 rounded-md border-none outline-none hover:bg-slate-200 transition-all focus:border-none focus:outline-none"
      :class="[selected ? 'bg-slate-200' : '']"
      @click="$emit('select')"
    >
      <div>
        {{ user.username }}
      </div>
      <div
        v-if="user.unreadMessages"
        class="self-center rounded-md bg-red-600 text-white text-xs px-1.5"
      >
        {{ user.unreadMessages }}
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserPreview',
  props: {
    user: {
      type: Object,
      default: null,
    },
    selected: Boolean,
  },
};
</script>
