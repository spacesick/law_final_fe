<template>
  <div class="w-full text-sm font-medium">
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
