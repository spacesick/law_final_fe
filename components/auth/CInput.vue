<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900">{{
      label
    }}</label>
    <input
      :value="value"
      :placeholder="placeholder"
      :required="required"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      :type="type"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ['label', 'type', 'placeholder', 'value', 'required'],
}
</script>
